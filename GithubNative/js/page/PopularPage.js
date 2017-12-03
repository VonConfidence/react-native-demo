import React, {Component} from 'react'

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  DeviceEventEmitter
} from 'react-native'

import { StackNavigator } from 'react-navigation';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

// component
import RepositoryCell from '../common/RepositoryCell'
import RepositoryDetail from "./RepositoryDetail";

import NavigationBar from '../common/NavigationBar'
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'

import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import FavoriteDao from '../expand/dao/FavoriteDao'
import ProjectModel from "../model/ProjectModel";

import Utils from '../util/Utils'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular)

class PopularPage extends Component {
  constructor(props) {
    super(props)
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.state = {
      languages: []
    }
  }

  componentDidMount() {
    this._loadData()
  }

  _loadData() {
    this.languageDao.fetch().then(result => {
      this.setState({
        languages: result
      })
    }).catch(error => {
      console.log(error.message)
    })
  }

  render() {
    let content = this.state.languages.length > 0 ?
      (
        <ScrollableTabView
          renderTabBar={() => <ScrollableTabBar/>}
          initialPage={0}
          tabBarBackgroundColor="#2196F3"
          tabBarInactiveTextColor="mintcream"
          tabBarActiveTextColor="white"
          tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
        >
          {this.state.languages.map((result, index, arr) => {
            let language = arr[index]
            return language.checked ?
              <PopularTab tabLabel={language.name} key={language.path + index} {...this.props}>{language.name}</PopularTab> : null;
          })}
          {/*<PopularTab tabLabel="Java">JAVA</PopularTab>*/}
          {/*<PopularTab tabLabel="iOS">iOS</PopularTab>*/}
          {/*<PopularTab tabLabel="JavaScript">JavaScript</PopularTab>*/}
          {/*<PopularTab tabLabel="Python">Python</PopularTab>*/}
        </ScrollableTabView>
      ) : null;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'最热'}
          style={{backgroundColor: '#2196F3'}}
          statusBar={{backgroundColor: '#2196F3'}}
        />
        {content}
        {/*<TouchableOpacity*/}
        {/*style={{borderWidth:1, backgroundColor:'blue', flexDirection: 'row', justifyContent:'center', width: 150}}*/}
        {/*onPress={() => this.onLoad()} >*/}
        {/*<Text style={{color:'white'}}>获取数据</Text>*/}
        {/*</TouchableOpacity>*/}
        {/*<TextInput*/}
        {/*style={{height: 30, borderWidth: 1}}*/}
        {/*onChangeText={text=> this.setState({text})}*/}
        {/*/>*/}
        {/*<Text>{JSON.stringify(this.state.result)}</Text>*/}
      </View>
    )
  } // end render
}


class PopularTab extends Component {
  constructor(props) {
    super(props)
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular)
    this.state = {
      text: '',
      dataSource: [],
      isLoading: false,
      favoriteKeys: []
    }
  }

  genFetchUrl(key) {
    return URL + encodeURIComponent(key) + QUERY_STR;
  }

  componentDidMount() {
    this.loadData()
  }
  // 能够更新project Item每一项收藏的状态
  flushFavoriteState() {
    let projectModels = [];
    let items = this.items;
    for (var i = 0; i < items.length; i ++) {
      projectModels.push(new ProjectModel(items[i], Utils.checkFavorite(items[i], this.state.favoriteKeys)))
    }
    this.updateState({
      isLoading:false,
      dataSource: projectModels
    })
  }
  updateState(dic) {
    if (!this) return;
    this.setState(dic)
  }
  getFavoriteKeys() {
    favoriteDao.getFavoriteKeys().then(keys=> {
      if (keys) {
        this.updateState({favoriteKeys:keys})
        // alert('--keys--'+JSON.stringify(keys))
      }
      this.flushFavoriteState()
    }).catch(error=> {
      alert(error.message)
      this.flushFavoriteState()
    })
  }
  loadData() {
    this.setState({isLoading: true})
    let url = this.genFetchUrl(this.props.tabLabel);
    this.dataRepository.fetchRepository(url).then(result => {
      console.log('result', result) //  网络数据: result.items  本地数据result
      // console.log(url)
      let items = result && result.items ? result.items : result ? result : [];
      this.items = items;
      console.log('items', items)
      // this.setState({dataSource: items, isLoading: false})
      // this.flushFavoriteState()
      this.getFavoriteKeys()
      if (result && result.update_date && !this.dataRepository.checkDate(result.update_date)) {
        DeviceEventEmitter.emit('showToast', '数据过时')
        console.log('数据过时')
        // 表明数据过时 从网络上获取数据
        setTimeout(()=> {
          DeviceEventEmitter.emit('showToast', '显示网络数据')
          console.log('显示网络数据')
        }, 1000)
        return this.dataRepository.fetchPopularRepository(url);
      } else {
        DeviceEventEmitter.emit('showToast', '显示缓存的本地数据')
        console.log('显示本地缓存数据')
        return items;
      }
    }).then(items => {
      if (!items && items.length == 0) {
        return;
      }
      this.items = items;
      this.getFavoriteKeys()
      // this.flushFavoriteState()
      // this.setState({
      //   dataSource: items
      // })
    }).catch(error => {
        alert('PopularPage: '+error.message)
        this.updateState({
          isLoading: false
        })
        // this.setState({
        //   isLoading: false
        // });
      }
    )

  }

  // 点击的RepositoryCell的时候 调用方法
  onSelect(projectModel) {
    this.props.navigation.navigate('RepositoryDetail', {projectModel: projectModel})
  }
  // 用户点击FavoriteIcon的时候改变用户的收藏状态
  onFavorite(item, isFavorite) {
    //处理一些数据库的操作
    if (isFavorite) {
      favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item))
    } else { // 用户取消收藏
      favoriteDao.removeFavoriteItem(item.id.toString())
    }
  }
  _renderItem({item, index}) {
    var projectModel = item;
    return (
      <RepositoryCell projectModel={projectModel} onSelect={this.onSelect.bind(this, projectModel)}
      onFavorite={this.onFavorite.bind(this)}
      />
    )
  }

  _ItemSeparatorComponent({item, index}) {
    var style = {
      height: 0.5,
      backgroundColor: '#CCCCCC'
    }

    return <View style={style} key={item + index}></View>
  }

  //此函数用于为给定的item生成一个不重复的key
  _keyExtractor(projectModel, index) {
    return projectModel.item.id;
  }

  _onRefresh() {
    //alert('下拉刷新')
    this.setState({isLoading: true})
    this.loadData()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/*<Text>{this.state.result}</Text>*/}
        <FlatList
          data={this.state.dataSource}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={this._keyExtractor.bind(this)}
          onRefresh={this._onRefresh.bind(this)}
          refreshing={this.state.isLoading}
          colors={['#2196F3']}
          title={'Loading...'}
          titleColor={'#2196F3'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const PopularPageNavigation = StackNavigator({
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      header: null
    }
  },
  RepositoryDetail: {
    screen: RepositoryDetail,
    navigationOptions: {
      header: null
    }
  }
})

export default PopularPageNavigation
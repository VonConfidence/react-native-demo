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

import {StackNavigator} from 'react-navigation'

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

import NavigationBar from '../common/NavigationBar'
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import TrendingCell from '../common/TrendingCell'
import RepositoryDetail from './RepositoryDetail'

import TimeSpan from '../model/TimeSpan'

import Popover from '../common/Popover'

import FavoriteDao from '../expand/dao/FavoriteDao'
import ProjectModel from "../model/ProjectModel";

import Utils from '../util/Utils'

const API_URL = 'https://github.com/trending/';

let timeSpanTextArray = [
  new TimeSpan('今 天', 'since=daily'),
  new TimeSpan('本 周', 'since=weekly'),
  new TimeSpan('本 月', 'since=monthly')
]

const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending)
// 从trending模块下面读取数据
const dataRepository = new DataRepository(FLAG_STORAGE.flag_trending)

class TrendingPage extends Component {
  constructor(props) {
    super(props)
    // 读取本地默认配置的语言
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
    this.state = {
      languages: [],

      isVisible: false,
      buttonRect:{},

      timeSpan: timeSpanTextArray[0]
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
  _showPopover() {
    this.refs.button.measure((ox, oy, width, height, px, py) => {
      this.setState({
        isVisible: true,
        buttonRect: {x: px, y: py, width: width, height: height}
      });
    });
  }
  _closePopover() {
    this.setState({isVisible: false});
  }
  _renderTitleView() {
    return <View>
      <TouchableOpacity ref="button" onPress={()=> this._showPopover()} style={styles.button}>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <Text style={{fontSize: 18, color:'white', fontWeight: '400'}}>趋势</Text>
          <Image source={require('../../res/images/ic_spinner_triangle.png')} style={{width: 12, height: 12, marginLeft: 5}}/>
        </View>
      </TouchableOpacity>
    </View>
  }
  _onSelectTimeSpan(timeSpan) {
    this.setState({
      timeSpan,
      isVisible: false
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
              <TrendingTab tabLabel={language.name} key={index} {...this.props} timeSpan={this.state.timeSpan}>{language.name}</TrendingTab> : null;
          })}
          {/*<TrendingTab tabLabel="Java">JAVA</TrendingTab>*/}
          {/*<TrendingTab tabLabel="iOS">iOS</TrendingTab>*/}
          {/*<TrendingTab tabLabel="JavaScript">JavaScript</TrendingTab>*/}
          {/*<TrendingTab tabLabel="Python">Python</TrendingTab>*/}
        </ScrollableTabView>
      ) : null;

    let timeSpanView = (
      <Popover
        isVisible={this.state.isVisible}
        fromRect={this.state.buttonRect}
        onClose={this._closePopover.bind(this)}
        placement="bottom"
        contentStyle={{backgroundColor: '#343434', opacity: 0.82}}
      >
        {timeSpanTextArray.map((item, index)=> {
          return <TouchableOpacity key={index} underlayColor='transparent' onPress={this._onSelectTimeSpan.bind(this, item)}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: '400', padding: 8}}>{item.showText}</Text>
          </TouchableOpacity>
        })}
    </Popover>)
    return (
      <View style={styles.container}>
        <NavigationBar
          titleView={this._renderTitleView()}
          style={{backgroundColor: '#2196F3'}}
          statusBar={{backgroundColor: '#2196F3'}}
        />
        {content}
        {timeSpanView}
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


class TrendingTab extends Component {
  constructor(props) {
    super(props)
    this.isRender = true;
    this.isFavoriteChanged = false;
    this.state = {
      text: '',
      dataSource: [],
      isLoading: false,
      favoriteKeys: [],
    }
  }
  updateState(dic) {
    if (!this) return;
    this.isRender = true;
    this.setState(dic);
  }
  genFetchUrl(timeSpan, category) {
    return API_URL + encodeURIComponent(category) + '/?'+timeSpan.searchText;
  }

  componentDidMount() {
    this.loadData(this.props.timeSpan, true)

    // 注册通知 更新收藏状态
    this.listener = DeviceEventEmitter.addListener('favoriteChanged_trending', ()=> {
      this.isFavoriteChanged = true;
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('TrendingPage: willReceiveProps: ')
    console.log(nextProps)
    if (nextProps.timeSpan !== this.props.timeSpan) {
      this.loadData(nextProps.timeSpan, true)
    }

    if (this.isFavoriteChanged) {
      this.isFavoriteChanged = false;
      this.getFavoriteKeys()
    }
  }
  componentWillUnmount() {
    if (this.listener) {
      this.listener.remove()
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.isRender) {
      this.isRender = false;
      return true;
    } else {
      return false;
    }
  }

  _onRefresh() {
    //alert('下拉刷新')
    this.setState({isLoading: true})
    this.loadData(this.props.timeSpan, true)
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
  loadData(timeSpan, isRefresh) {
    this.updateState({isLoading: true})
    let url = this.genFetchUrl(timeSpan,this.props.tabLabel);
    // alert(url);
    dataRepository.fetchRepository(url).then(result => {
      console.log('result', result) //  网络数据: result.items  本地数据result
      // console.log(url)
      let items = result && result.items ? result.items : result ? result : [];
      this.items = items;
      console.log('items', items)
      // this.setState({dataSource: items, isLoading: false})
      this.getFavoriteKeys();
      if (result && result.update_date && !dataRepository.checkDate(result.update_date)) {
        DeviceEventEmitter.emit('showToast', '数据过时')
        console.log('数据过时')
        // 表明数据过时 从网络上获取数据
        setTimeout(()=> {
          DeviceEventEmitter.emit('showToast', '显示网络数据')
          console.log('显示网络数据')
        }, 1000)
        return dataRepository.fetchPopularRepository(url);
      } else {
        DeviceEventEmitter.emit('showToast', '显示缓存的本地数据')
        console.log('显示本地缓存数据')

        // 强制刷新  在items不存在的情况下   或者 result日期过期 强制刷新
        if(!items||isRefresh&&result && result.update_date && !dataRepository.checkDate(result.update_date)){
          return dataRepository.fetchNetRepository(url);
        }
        return items;
      }
    }).then(items => {
      if (!items && items.length == 0) {
        return;
      }
      this.items = items;
      this.getFavoriteKeys();
      // this.updateState({
      //   dataSource: items
      // })
    }).catch(error => {
        alert(error.message)
        this.updateState({
          isLoading: false
        });
      }
    )

  }

  // 点击的TrendingCell的时候 调用方法
  onSelect(projectModel) {
    this.props.navigation.navigate('RepositoryDetail', {projectModel, flag: FLAG_STORAGE.flag_trending})
  }

  _renderItem({item, index}) {
    let projectModel = item;
    return (
      <TrendingCell
        projectModel={projectModel}
        onSelect={this.onSelect.bind(this, projectModel)}
        onFavorite={this.onFavorite.bind(this)}/>
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
  _keyExtractor(item, index) {
    let projectModel = item;
    return projectModel.item.fullName + index;
  }

  // 用户点击FavoriteIcon的时候改变用户的收藏状态
  onFavorite(item, isFavorite) {
    //处理一些数据库的操作
    if (isFavorite) {
      favoriteDao.saveFavoriteItem(item.fullName, JSON.stringify(item))
    } else { // 用户取消收藏
      favoriteDao.removeFavoriteItem(item.fullName)
    }
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
  },
  button: {
  },
  buttonText: {
  }
})

const TrendingPageNavigation = StackNavigator({
  TrendingPage: {
    screen: TrendingPage,
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

export default TrendingPageNavigation
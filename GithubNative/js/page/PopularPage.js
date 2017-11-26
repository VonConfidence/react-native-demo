import React, {Component} from 'react'

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native'

import NavigationBar from '../common/NavigationBar'
import DataRepository from '../expand/dao/DataRepository'

import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

import RepositoryCell from '../common/RepositoryCell'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {
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
    this.languageDao.fetch().then(result=> {
      this.setState({
        languages: result
      })
    }).catch(error=> {
      console.log(error.message)
    })
  }
  render() {
    let content= this.state.languages.length > 0?
    (
      <ScrollableTabView
        renderTabBar={()=> <ScrollableTabBar/>}
        initialPage={0}
        tabBarBackgroundColor="#2196F3"
        tabBarInactiveTextColor="mintcream"
        tabBarActiveTextColor="white"
        tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
      >
        {this.state.languages.map((result, index, arr)=> {
          let language = arr[index]
          return language.checked ? <PopularTab tabLabel={language.name} key={language.path+index}>{language.name}</PopularTab> : null;
        })}
        {/*<PopularTab tabLabel="Java">JAVA</PopularTab>*/}
        {/*<PopularTab tabLabel="iOS">iOS</PopularTab>*/}
        {/*<PopularTab tabLabel="JavaScript">JavaScript</PopularTab>*/}
        {/*<PopularTab tabLabel="Python">Python</PopularTab>*/}
      </ScrollableTabView>
    ): null;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'最热'}
          style={{backgroundColor:'#2196F3'}}
          statusBar={{backgroundColor:'#2196F3'}}
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
    this.dataRepository = new DataRepository()
    this.state = {
      text: '',
      dataSource: [],
      isLoading:false
    }
  }
  genUrl(key) {
    return URL + encodeURIComponent(key) + QUERY_STR;
  }
  componentDidMount() {
    this.loadData()
  }
  loadData() {
    this.setState({isLoading:true})
    let url = this.genUrl(this.props.tabLabel);
    this.dataRepository.fetchPopularRepository(url).then(result=> {
      console.log(result)
      console.log(url)
      this.setState({dataSource: result.items, isLoading:false})
    }).catch(error=> alert(error.message))
  }
  _renderItem({item, index}) {
    return (
      <RepositoryCell item={item}/>
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
    return item.id;
  }
  _onRefresh() {
    //alert('下拉刷新')
    this.setState({isLoading: true})
    this.loadData()
  }
  render() {
    return (
      <View style={{flex:1}}>
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
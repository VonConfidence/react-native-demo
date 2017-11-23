import React, {Component} from 'react'

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList
} from 'react-native'

import NavigationBar from '../common/NavigationBar'
import DataRepository from '../expand/dao/DataRepository'

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

import RepositoryCell from '../common/RepositoryCell'

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'最热'}
          style={{backgroundColor:'#2196F3'}}
          statusBar={{backgroundColor:'rgb(234,32,0)'}}
        />
        <ScrollableTabView
          renderTabBar={()=> <ScrollableTabBar/>}
          tabBarBackgroundColor="#2196F3"
          tabBarInactiveTextColor="mintcream"
          tabBarActiveTextColor="white"
          tabbarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
        >
          <PopularTab tabLabel="Java">JAVA</PopularTab>
          <PopularTab tabLabel="iOS">iOS</PopularTab>
          <PopularTab tabLabel="JavaScript">JavaScript</PopularTab>
          <PopularTab tabLabel="Python">Python</PopularTab>
        </ScrollableTabView>
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
      dataSource: []
    }
  }
  genUrl(key) {
    return URL + encodeURIComponent(key) + QUERY_STR;
  }
  componentDidMount() {
    this.loadData()
  }
  loadData() {
    let url = this.genUrl(this.props.tabLabel);
    this.dataRepository.fetchPopularRepository(url).then(result=> {
      console.log(result)
      console.log(url)
      this.setState({dataSource: result.items})
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
  render() {
    return (
      <View>
        {/*<Text>{this.state.result}</Text>*/}
        <FlatList
          data={this.state.dataSource}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={this._keyExtractor.bind(this)}
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
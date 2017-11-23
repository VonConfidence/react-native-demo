/*
  图书列表模块: 搜索栏 , 图书;列表

  图书列表内容: 通过图书搜索接口获取多条图书数据


  图书列表item是单独封装的
 */

import React, {Component} from 'react'

import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';

import Util from './../common/util'
import SearchBar from './../common/searchBar'
import ServiceURL from './../common/service'

import BookItem from './book_item'

export default class BookList extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      // dataSource
      dataSource:[],

      // 网络请求标识
      show: false,
      // 搜索关键字
      keywords: 'React'
    }
  }
  _getData() {
    // 开启loading
    this.setState({show:false});
    // 请求数据

    var _this = this;
    var url = ServiceURL.book_search + '?count=20&q=' + this.state.keywords;
    Util.getRequest(url, (data)=> {
      // alert(data.books.length)
      // 请求成功的回调函数
      // {'count': 0, 'start':0, total: 0, books:[]}
      if (!data.books || data.books.length == 0) {
        return alert('未查询到相关书籍')
      }
      // 设置下载状态和数据源
      _this.setState({dataSource: data.books, show:true})
      console.log(data.books)
    }, (error)=> {
      // 请求失败的回调函数
      alert('网络请求错误: ' + error.message)
    })
  }
  componentDidMount() {
    this._getData();
  }
  _renderItem({item, index}) {
    return <BookItem
      book={item}
      key={item.id}
      onPress={()=> this.props.navigation.navigate('BookDetail', {bookID:item.id})}
    />
  }
  _renderSeparator({item, index}) {
    var style = {
      height: 1,
      backgroundColor: '#CCCCCC'
    }

    return <View style={style} key={item + index}></View>
  }
  //此函数用于为给定的item生成一个不重复的key
  _keyExtractor(item, index) {
    return item.id;
  }

  // TextInput的onChangeText事件的处理方法
  _changeText(keywords) {
    this.setState({keywords})
  }
  _searchPress() {
    this._getData();
  }
  render() {
    return (
      <ScrollView>
        <SearchBar placeholder="请输入图书的名称" onPress={this._searchPress.bind(this)} onChangeText={this._changeText.bind(this)}/>
        {
          // 请求数据的时候显示loading, 数据请求成功以后显示loading
          this.state.show?
            <FlatList
              data={this.state.dataSource}
              initialNumToRender={10}
              renderItem={this._renderItem.bind(this)}
              keyExtractor={this._keyExtractor}
              ItemSeparatorComponent={this._renderSeparator.bind(this)}
            />
            :
            Util.loading
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

})
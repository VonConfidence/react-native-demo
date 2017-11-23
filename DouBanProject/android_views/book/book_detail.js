/*
  图书详情页面

  实现功能:
    展示图书详情, 包括: 图书信息 图书简介 作者简介

 包含组件:
    基本组件, BookItem(图书信息使用BookItem展示)

  外部传入

  需要使用的字段
    image 图书缩略图
    title 图书名称
    publisher 出版社
    author 作者
    price 价格
    pages 图书的总页数
    summary 图书简介
    author_intro 作者简介
 */


import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView
} from 'react-native';

import ServiceURL from './../common/service'
import Util from './../common/util'
import Header from './../common/header'


import BookItem from './book_item'

export default class BookDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookData: null // 图书对象详情信息
    }
  }
  _getData() {
    var _this = this;

    // 接收路由对象传递过来的数据
    var url = ServiceURL.book_detail_id + this.props.navigation.state.params.bookID;

    Util.getRequest(url, (bookData)=> {
      if (!bookData.id) {
        return alert('请求的数据不存在')
      }
      _this.setState({bookData})
    }, (error)=> {
      // 请求失败的回调函数
      alert('网络请求错误: ' + error.message)
    })
  }
  componentDidMount() {
    this._getData();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.bookData ?
            <View>
              <Header initObj={{backName: '图书', barTitle: this.state.bookData.title}} navigation={this.props.navigation} />
              <BookItem book={this.state.bookData}/>
              <View>
                <Text style={styles.title}>图书简介</Text>
                <Text style={styles.text}>{this.state.bookData.summary}</Text>
              </View>
              <View style={{marginTop:10}}>
                <Text style={styles.title}>作者简介</Text>
                <Text style={styles.text}>{this.state.bookData.author_intro}</Text>
              </View>

              <View style={{height: 55}}></View>
            </View>
            :
            Util.loading
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    color: '#000D22'
  }
})


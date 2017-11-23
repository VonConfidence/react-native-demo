/*
  实现功能: 展示图书信息, 点击item进入图书详情

  包含组件: 基本组件

  外部传入:
    book  图书对象
    onPress事件处理方法   通过...this.props绑定参数, 即图书的id

    需要使用的字段:
      image 图书缩略图
      title 图书的名称
      publisher 出版社
      author 作者
      price  价格
      pages  图书的总页数
 */

import React, {Component} from 'react'

import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';


export default class BookItem extends Component<{}> {
  constructor(props) {
    super(props)
  }

  render() {
    var book = this.props.book;
    // console.log(book)
    return (
      <TouchableOpacity style={styles.item} {...this.props}>
        {/*图书图像*/}
        <View style={styles.imageContainer}>
          <Image source={{uri:book.image}} style={styles.image}></Image>
        </View>

        {/*图书信息*/}
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text numberOfLines={1}>{book.title}</Text>
          </View>
          <View style={styles.textContainer} >
            <Text style={styles.publisher_author} numberOfLines={1}>{book.publisher}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.publisher_author} numberOfLines={1}>{book.author[0]}</Text>
          </View>
          <View style={{flexDirection: 'row', flex:1, alignItems: 'center'}}>
            <Text style={styles.price}>{book.price}</Text>
            <Text style={styles.pages}>{book.pages}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  item:{
    flexDirection: 'row',
    height: 120,
    padding: 10,
    backgroundColor: '#fff'
  },
  imageContainer: {
    justifyContent:'center',
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 100,
  },
  contentContainer: {
    flex:1,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  publisher_author: {
    color: '#A3A3A3',
    fontSize: 13,
  },
  price: {
    color: '#2BB2A3',
    fontSize: 16
  },
  pages: {
    marginLeft: 8,
    color: '#A7A0A0'
  }

})

/*
  实现功能: 封装header, 在头部展示标题和 返回按钮

  包含组件

  外部传入:
    navigator
    initObj(backName, title) 返回按钮的名称, 标题
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Icon from './leftIcon'

export default class Header extends Component<{}> {
  constructor(props) {
    super(props)
  }
  // 返回按钮的事件处理方法
  _pop() {
    // this.props.navigator.pop();
    this.props.navigation.goBack();
  }
  render() {
    // 获取obj对象, 包括backName(按钮名称), barTitle
    var headerContent = this.props.initObj
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.left_btn} onPress={this._pop.bind(this)}>
          <Icon/>
          <Text style={styles.btn_text}>{headerContent.backName}</Text>
        </TouchableOpacity>
        <View style={styles.title_container}>
          <Text style={styles.title} numberOfLines={1}>{headerContent.barTitle}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 44,
    backgroundColor: '#3497FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  left_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_text: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  },
  title_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 18,
    width: 200
  }
})
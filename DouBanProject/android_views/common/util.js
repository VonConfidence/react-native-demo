/*
  实现功能:
      定义多个属性, 在项目中会使用一些功能, 包括: 获取屏幕尺寸, loading组件, GET请求方法

  包含组件:

  外部传入
      GET请求方法需要从外部传入url, 请求成功回调方法, 请求失败的回调方法
 */

import React, {Component} from 'react';

import {
  StyleSheet,
  Dimensions, // 用于获取屏幕的尺寸
  View,
  Text,
  ActivityIndicator // loading组件
} from 'react-native'

var Util = {
  // 屏幕尺寸
  windowSize: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  // 基于fetch的get方法, 只负责下载数据, 下载数据后的处理方法在回调方法中实现
  getRequest(url, successCallback, failCallback) {
    fetch(url).then(response => response.json()).then(responseData => successCallback(responseData)).catch(error => failCallback(error));
  },

  // loading组件效果
  loading: <ActivityIndicator style={{marginTop: 200}}/>
}

export default Util
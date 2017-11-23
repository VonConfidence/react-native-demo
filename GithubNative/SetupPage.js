/*
  完成页面初始化
 */
import React, {Component} from 'react'

import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native'

import {
  StackNavigator
} from 'react-navigation'

import WelcomePage from './js/page/WelcomePage'
import AppPage from './App'

const SetupNavigation = StackNavigator({
  WelcomePage: {
    screen: WelcomePage,
  },
  AppPage: {
    screen: AppPage, // 可以覆盖组件内部的navigationOptions配置
  }
}, {
  initialRouteName: 'WelcomePage',
  navigationOptions: {
    // headerTitle: '主题',
    // headerBackTitle:'返回',
    // headerRight:<Text>右侧</Text>,
    // headerLeft:<Text>左侧</Text>
    header: null // 全局配置 会被组件内部的static navigationOptions配置覆盖
  }
})

export default SetupNavigation
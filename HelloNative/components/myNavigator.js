import React, {Component} from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'


// Navigator 已经被废弃了 不在存在于react-native包中
// 推荐使用 http://reactnative.cn/docs/0.50/navigation.html#content
// yarn add react-navigation
import {Navigator} from 'react-native-deprecated-custom-components'

/**
 * 实现导航功能, 页面切换
 *
 *    1. 设置路由对象 (告诉导航器要显示哪个页面)
 *          创建路由对象, 对象内容自定义, 但是必须包含场景需要展示的页面组件
 *    2. 场景渲染配置 (告诉导航器需要什么样的跳转效果)
 *
 *    3. 渲染场景(告诉导航器如何渲染场景)
 *          利用第一步创建的设置的路由对象渲染场景
 */

class FirstPage extends Component<{}> {
  pressPush() {
    var nextRoute = {
      component: SecondPage
    }
    this.props.navigator.push(nextRoute)
  }
  render() {
    return (
      <View  style={[styles.flex, {backgroundColor: 'yellow'}]}>
        <TouchableHighlight onPress={this.pressPush.bind(this)} style={styles.btn}>
          <Text>点击推出下一级页面</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

class SecondPage extends Component<{}> {
  pressPop() {

  }
  render() {
    return (
      <View  style={[styles.flex, {backgroundColor: 'cyan'}]}>
        <TouchableOpacity onPress={this.pressPop.bind(this)} style={styles.btn}>
          <Text>点击返回上一级</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


export default class MyNavigator extends Component<{}> {
  render() {
    var rootRoute = {
      component: FirstPage
    }
    return (
      <View>
        <Text>123 Test</Text>
        <Navigator
          /*
          * 第一步: initialRoute
          *   指定了默认的页面, 就是app启动后看到界面的第一屏
          *   对象属性自定义, 这个对象中的内容会在renderScene方法中处理
          * */
          initialRoute={rootRoute}
          /**
          * 第二步 configureScene
          *   场景渲染配置
          */
          configureScene={(route)=> {
            return Navigator.SceneConfigs.PushFromRight; // 从右往左
          }}
          /**
          * 第三步: renderScene
          *   参数:
          *     route(第一步创建并设置给导航器的路由对象)
          *   实现
          *     给需要显示的组件设置属性
          */
          renderScene={(route,navigator)=> {
            // 从route对象中获取页面组件
            var Component = route.component;
            return (
              <Component navagator={navagator} route={route} />
            )
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flex: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    width: 150,
    height: 30,
    borderColor: '#0089FF',
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
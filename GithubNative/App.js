/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  DeviceEventEmitter
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'

import TabNavigator from 'react-native-tab-navigator';

import { StackNavigator } from 'react-navigation';


import PopularPage from "./js/page/PopularPage"
import TrendingPage from './js/page/TrendingPage'
import MyPage from './js/page/My/MyPage'
// import WebViewTest from './js/common/WebViewTest'
import FavoritePage from './js/page/FavoritePage'

// Test Page
// import BoyComponent from './js/common/Boy'
// import GirlComponent from './js/common/Girl'
// import TrendingPageTest from "./js/common/TrendingPageTest";



// import AsyncPage from './js/common/AsyncPage'

/*
const PopularPageNavigation = StackNavigator({
  Boy: {
    screen: BoyComponent,
    navigationOptions: {
      header: null
    }
  },
  Girl:{
    screen: GirlComponent,
    navigationOptions: {
      header: null
    }
  }
});
*/

export default class App extends Component<> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'tb_popular'
    }
  }
  componentDidMount() {
    // 注册一个事件通知
    this.listener = DeviceEventEmitter.addListener('showToast', (text)=> {
      this.toast.show(text, DURATION.LENGTH_LONG)
    })
  }
  componentWillMount() {
    // 在组件移除的时候  移除掉全局事件监听
    this.listener && this.listener.remove()
  }
  _renderTab(Component, selectTab, title, renderIcon) {
    return <TabNavigator.Item
      selected={this.state.selectedTab === selectTab}
      title={title}
      selectedTitleStyle={{color:'#2196F3'}}
      renderIcon={() => <Image source={renderIcon} style={styles.image} />}
      renderSelectedIcon={() => <Image source={renderIcon} style={[styles.image, {tintColor: '#2196F3'}]} />}
      badgeText=""
      onPress={() => this.setState({ selectedTab: selectTab })}>
      <Component />
    </TabNavigator.Item>
  }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          {this._renderTab(PopularPage, 'tb_popular', '最热', require('./res/images/ic_popular.png') )}
          {this._renderTab(TrendingPage, 'tb_trending', '趋势', require('./res/images/ic_trending.png') )}
          {this._renderTab(FavoritePage, 'tb_favorite', '收藏', require('./res/images/ic_favorite.png') )}
          {this._renderTab(MyPage, 'tb_my', '我的', require('./res/images/ic_my.png') )}
          {/*
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_popular'}
            title="最热"
            selectedTitleStyle={{color:'#2196F3'}}
            renderIcon={() => <Image source={require('./res/images/ic_popular.png')} style={styles.image} />}
            renderSelectedIcon={() => <Image source={require('./res/images/ic_popular.png')} style={[styles.image, {tintColor: '#2196F3'}]} />}
            badgeText=""
            onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
            <PopularPage />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            title="趋势"
            selectedTitleStyle={{color:'red'}}
            renderIcon={() => <Image source={require('./res/images/ic_trending.png')} style={styles.image} />}
            renderSelectedIcon={() => <Image source={require('./res/images/ic_trending.png')} style={[styles.image, {tintColor: 'red'}]} />}
            onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
              <TrendingPage />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            title="收藏"
            selectedTitleStyle={{color:'red'}}
            renderIcon={() => <Image source={require('./res/images/ic_favorite.png')} style={styles.image} />}
            renderSelectedIcon={() => <Image source={require('./res/images/ic_favorite.png')} style={[styles.image, {tintColor: 'red'}]} />}
            onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            <WebViewTest/>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            title="我的"
            selectedTitleStyle={{color:'red'}}
            renderIcon={() => <Image source={require('./res/images/ic_my.png')} style={styles.image} />}
            renderSelectedIcon={() => <Image source={require('./res/images/ic_my.png')} style={[styles.image, {tintColor: 'red'}]} />}
            onPress={() => this.setState({ selectedTab: 'tb_my' })}>
            <MyPage/>
          </TabNavigator.Item>
          */}
        </TabNavigator>

        <Toast ref={toast=> this.toast = toast}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page1: {
    flex: 1,
    backgroundColor: 'red'
  },
  page2: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  page3: {
    flex: 1,
    backgroundColor: 'dodgerblue'
  },
  page4: {
    flex: 1,
    backgroundColor: 'green'
  },
  image: {
    height: 22,
    width: 22
  }
});

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
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import { StackNavigator } from 'react-navigation';

import BoyComponent from './js/common/Boy'
import GirlComponent from './js/common/Girl'
import PopularPage from "./js/page/PopularPage";

const RootNavigator = StackNavigator({
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      header: null
    }
  },
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

export default class App extends Component<> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'tb_popular'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_popular'}
            title="最热"
            selectedTitleStyle={{color:'red'}}
            renderIcon={() => <Image source={require('./res/images/ic_popular.png')} style={styles.image} />}
            renderSelectedIcon={() => <Image source={require('./res/images/ic_popular.png')} style={[styles.image, {tintColor: 'red'}]} />}
            badgeText="1"
            onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
            <RootNavigator />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            title="趋势"
            selectedTitleStyle={{color:'red'}}
            renderIcon={() => <Image source={require('./res/images/ic_trending.png')} style={styles.image} />}
            renderSelectedIcon={() => <Image source={require('./res/images/ic_trending.png')} style={[styles.image, {tintColor: 'red'}]} />}
            onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
            <View style={styles.page2}></View>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_favorite'}
            title="收藏"
            selectedTitleStyle={{color:'red'}}
            renderIcon={() => <Image source={require('./res/images/ic_favorite.png')} style={styles.image} />}
            renderSelectedIcon={() => <Image source={require('./res/images/ic_favorite.png')} style={[styles.image, {tintColor: 'red'}]} />}
            onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
            <View style={styles.page3}></View>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_my'}
            title="我的"
            selectedTitleStyle={{color:'red'}}
            renderIcon={() => <Image source={require('./res/images/ic_my.png')} style={styles.image} />}
            renderSelectedIcon={() => <Image source={require('./res/images/ic_my.png')} style={[styles.image, {tintColor: 'red'}]} />}
            onPress={() => this.setState({ selectedTab: 'tb_my' })}>
            <View style={styles.page4}></View>
          </TabNavigator.Item>
        </TabNavigator>
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

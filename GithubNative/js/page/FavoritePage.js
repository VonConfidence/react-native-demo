import React, {Component} from 'react'

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  DeviceEventEmitter
} from 'react-native'

import {StackNavigator} from 'react-navigation';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'

// component
import RepositoryCell from '../common/RepositoryCell'
import RepositoryDetail from "./RepositoryDetail";

import NavigationBar from '../common/NavigationBar'
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'

import FavoriteDao from '../expand/dao/FavoriteDao'
import ProjectModel from "../model/ProjectModel";

import TrendingCell from "../common/TrendingCell";
import ArrayUtils from "../util/ArrayUtils";

class FavoritePage extends Component {
  constructor(props) {
    super(props)
  }
  static onNavigationStateChange(prevState, newState) {
    console.log('navigationStateChange: ')
    console.log(prevState, newState)
  }
  render() {
    let content =
      (
        <ScrollableTabView
          renderTabBar={() => <ScrollableTabBar/>}
          initialPage={0}
          tabBarBackgroundColor="#2196F3"
          tabBarInactiveTextColor="mintcream"
          tabBarActiveTextColor="white"
          tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
        >
          <FavoriteTab tabLabel="最热" flag={FLAG_STORAGE.flag_popular} {...this.props}>最热</FavoriteTab>
          <FavoriteTab tabLabel="趋势" flag={FLAG_STORAGE.flag_trending} {...this.props}>趋势</FavoriteTab>
        </ScrollableTabView>
      );
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'收藏'}
          style={{backgroundColor: '#2196F3'}}
          statusBar={{backgroundColor: '#2196F3'}}
        />
        {content}
      </View>
    )
  } // end render
}


class FavoriteTab extends Component {
  constructor(props) {
    super(props)
    this.favoriteDao = new FavoriteDao(this.props.flag)
    this.unFavoriteItems = [] // 用户点击不收藏的按钮
    this.state = {
      dataSource: [],
      isLoading: false,
      favoriteKeys: []
    }
  }

  componentDidMount() {
    this.loadData(true)
  }

  componentWillReceiveProps(nextProps) {
    // 从详情页返回的时候 能够刷新列表
    this.loadData(false);  // 这里没有效果  需要用到redux 不会
  }

  updateState(dic) {
    if (!this) return;
    this.setState(dic)
  }

  loadData(isShowLoading) {
    if (isShowLoading) {
      this.setState({isLoading: true})
    }
    this.favoriteDao.getAllItems().then(items => {
      var resultData = [];
      for (let i = 0; i < items.length; i++) {
        resultData.push(new ProjectModel(items[i], true))
      }
      this.updateState({
        isLoading: false,
        dataSource: resultData
      })
    }).catch(error => {
      this.updateState({isLoading: false})
      alert('FavoritePage loadData: ' + error.message)
    })
  }

  // 点击的RepositoryCell的时候 调用方法
  onSelect(projectModel) {
    this.props.navigation.navigate('RepositoryDetail', {projectModel: projectModel, flag: FLAG_STORAGE.flag_popular})
  }

  // 用户点击FavoriteIcon的时候改变用户的收藏状态
  onFavorite(item, isFavorite) {
    //处理一些数据库的操作  同时进行适配  操作的是 trending 还是popular模块
    var key = this.props.flag === FLAG_STORAGE.flag_popular ? item.id.toString() : item.fullName;
    // var key = projectModel.item.fullName? projectModel.item.fullName : projectModel.item.id.toString();
    if (isFavorite) {
      this.favoriteDao.saveFavoriteItem(key, JSON.stringify(item))
    } else { // 用户取消收藏
      this.favoriteDao.removeFavoriteItem(key)
    }

    // 保留用户的操作记录 将用户记录保存在数组中
    ArrayUtils.updateArray(this.unFavoriteItems, item);
    if (this.unFavoriteItems.length > 0) {
      if (this.props.flag === FLAG_STORAGE.flag_popular) {
        DeviceEventEmitter.emit('favoriteChanged_popular')
      } else {
        DeviceEventEmitter.emit('favoriteChanged_trending')
      }
    }
  }

  _renderItem({item, index}) {
    let CellComponent = this.props.flag === FLAG_STORAGE.flag_popular ? RepositoryCell : TrendingCell
    var projectModel = item;
    return (
      <CellComponent
        projectModel={projectModel}
        onSelect={this.onSelect.bind(this, projectModel)}
        onFavorite={this.onFavorite.bind(this)}
      />
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
  _keyExtractor(projectModel, index) {
    var key = this.props.flag === FLAG_STORAGE.flag_popular ? projectModel.item.id : projectModel.item.fullName;
    return key;
  }

  _onRefresh() {
    //alert('下拉刷新')
    this.setState({isLoading: true})
    this.loadData()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/*<Text>{this.state.result}</Text>*/}
        <FlatList
          data={this.state.dataSource}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={this._keyExtractor.bind(this)}
          onRefresh={this._onRefresh.bind(this)}
          refreshing={this.state.isLoading}
          colors={['#2196F3']}
          title={'Loading...'}
          titleColor={'#2196F3'}
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

const FavoritePageNavigation = StackNavigator({
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      header: null
    }
  },
  RepositoryDetail: {
    screen: RepositoryDetail,
    navigationOptions: {
      header: null
    }
  }
})

export default FavoritePageNavigation
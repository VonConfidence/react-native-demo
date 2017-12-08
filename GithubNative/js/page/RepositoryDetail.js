import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
  WebView,
  DeviceEventEmitter
} from 'react-native';

// StatusBar.setHidden(true);

import NavigationBar from '../common/NavigationBar'
import ViewUtils from "../util/ViewUtils";

const TRENDING_URL = 'https://github.com/'

import FavoriteDao from '../expand/dao/FavoriteDao'

export default class RepositoryDetail extends Component<> {
  constructor(props) {
    super(props);
    // 适配popularPage 和 trendingPage
    this.url = this.props.navigation.state.params.projectModel.item.html_url ? this.props.navigation.state.params.projectModel.item.html_url : TRENDING_URL + this.props.navigation.state.params.projectModel.item.fullName;
    this.title = this.props.navigation.state.params.projectModel.item.full_name ? this.props.navigation.state.params.projectModel.item.full_name : this.props.navigation.state.params.projectModel.item.fullName;

    // flag 哪儿来的: 从路由里面传输过来
    this.favoriteDao = new FavoriteDao(this.props.navigation.state.params.flag)

    this.state = {
      url: this.url,
      title: this.title,
      canGoBack: false
    }
  }

  goBack() {
    if (this.state.canGoBack) {
      this.refs['web_view'].goBack();
    } else {
      // DeviceEventEmitter.emit('showToast', '到顶了')
      this.props.navigation.goBack()
    }
  }

  go() {
    this.setState({
      url: this.text
    })
  }

  onNavigationStateChange(navState) {
    console.log(navState)
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url,

      isFavorite: this.props.navigation.state.params.projectModel.isFavorite,
      favoriteIcon: this.props.navigation.state.params.projectModel.isFavorite?require('../../res/images/ic_star.png'): require('../../res/images/ic_unstar_navbar.png')
    })
  }
  setFavoriteState(isFavorite) {
    this.setState({
      isFavorite,
      favoriteIcon: isFavorite? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_navbar.png')
    })
  }
  onRightButtonClick() {
    var projectModel = this.props.navigation.state.params.projectModel;
    this.setFavoriteState(projectModel.isFavorite=!projectModel.isFavorite)

    var key = projectModel.item.fullName? projectModel.item.fullName : projectModel.item.id.toString();
    //处理一些数据库的操作
    if (projectModel.isFavorite) {
      this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item))
    } else { // 用户取消收藏
      this.favoriteDao.removeFavoriteItem(key)
    }
  }
  renderRightButton() {
    return (
      <TouchableOpacity onPress={this.onRightButtonClick.bind(this)}>
        <Image
          style={{width:20, height: 20, marginRight:10}}
          source={this.state.favoriteIcon}
        />
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.state.title}
          style={{backgroundColor: 'rgb(277,104,81)'}}
          statusBar={{backgroundColor: 'rgb(277,104,81)'}}
          leftButton={ViewUtils.getLeftButton(() => this.goBack())}

          rightButton={this.renderRightButton()}
        />
        <WebView
          ref={'web_view'}
          source={{uri: this.state.url}}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  tips: {
    fontSize: 20
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    margin: 2
  }
});

import React, {Component} from 'react'

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  PixelRatio,
  Platform,
  Linking,
  DeviceEventEmitter
} from 'react-native'

import ViewUtils from "../../util/ViewUtils"
import GlobalStyles from '../../../res/styles/GolbalStyles'

import {MORE_MENU} from '../../common/MoreMenu'
import AboutCommon, {FLAG_ABOUT} from './AboutCommon'

import Config from '../../../res/data/config.json'

export default class AboutPage extends Component {
  constructor(props) {
    super(props)
    this.aboutCommon = new AboutCommon(this.props,this.updateState.bind(this),FLAG_ABOUT.flag_about,Config)
    this.state = {
      projectModels: [],
      author: Config.author
    }
  }
  componentDidMount() {
    this.aboutCommon.componentDidMount()
  }
  updateState(dic) {
    // console.log('AboutPage: updateState==> ', dic)
    this.setState(dic);
  }

  onClick(tab) {
    // alert(tab)
    const {navigate} = this.props.navigation;
    let navigateUrl = '';
    let params = {};
    switch (tab) {
      case MORE_MENU.About_Author:
        navigateUrl = 'AboutMePage'
        break;
      case MORE_MENU.WebSite:
        navigateUrl = 'WebViewPage'
        params = {
          title: 'Confidence GitHub',
          url: 'https://github.com/VonConfidence'
        }
        break;
      case MORE_MENU.Feedback:
        // navigateUrl='FeedbackPage'
        var url='mailto://wangzhemeili.163.com'
        Linking.canOpenURL(url).then(supported=> {
          if (!supported) {
            return DeviceEventEmitter.emit('showToast', '不支持邮件发送协议')
          } else {
            return Linking.openURL(url)
          }
        })
        break;
      default:
        break;
    }
    if (navigateUrl) {
      navigate(navigateUrl, params)
    }
  }

  render() {
    let content = (
      <View>
        {this.aboutCommon.renderRepository(this.state.projectModels)}
        {ViewUtils.getSettingItem(this.onClick.bind(this,MORE_MENU.WebSite), require('../../../res/images/ic_computer.png'), MORE_MENU.WebSite, {tintColor: '#2196F3'})}
        <View style={GlobalStyles.line}/>
        {ViewUtils.getSettingItem(this.onClick.bind(this,MORE_MENU.About_Author), require('../../page/My/images/ic_insert_emoticon.png'), MORE_MENU.About_Author, {tintColor: '#2196F3'})}
        <View style={GlobalStyles.line}/>

        {ViewUtils.getSettingItem(this.onClick.bind(this,MORE_MENU.Feedback), require('../../../res/images/ic_feedback.png'), MORE_MENU.Feedback, {tintColor: '#2196F3'})}
        <View style={GlobalStyles.line}/>

      </View>
    )
    return this.aboutCommon.renderView(content, {
      'name': 'GitHub Popular',
      'description': this.state.author.description,
      'avatar': this.state.author.avatar1,
      "backgroundImg": this.state.author.backgroundImg1
    })
  }
}

const styles = StyleSheet.create({
});
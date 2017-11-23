/*
  实现功能:
      封装webview, 根据传入的url展示网页信息
  包含组件:
      Header, WebView
   外部传入
      给header设置: navigator, initObj(backname, title)
      给webview设置 source
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  WebView
} from 'react-native';

import Header from './header'

export default class CustomWebView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var title = this.props.navigation.state.params.title;
    var url = this.props.navigation.state.params.url;
    var backName = this.props.navigation.state.params.backName;
    alert(url)
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Header navigation={this.props.navigation}
                initObj={{backName, barTitle: title}}></Header>
        <WebView
          startInLoadingState={true}
          contentInset={{top: -44, bottom: -120}}
          source={{url}}
        />
      </View>
    )
  }
}



import React, { Component } from 'react';
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

import GolbalStyles from '../../res/styles/GolbalStyles'
import ViewUtils from "../util/ViewUtils";

export default class WebViewPage extends Component<> {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.navigation.state.params.url,
      title: this.props.navigation.state.params.title,
      canGoBack:false
    }
  }
  goBack() {
    if (this.state.canGoBack) {
      this.refs['web_view'].goBack();
    } else {
      // DeviceEventEmitter.emit('showToast', '到顶了')
      this.props.navigation.goBack();
    }
  }
  onNavigationStateChange(navState) {
    // console.log(navState)
    this.setState({
      canGoBack: navState.canGoBack,
      title: this.state.title?this.state.title:navState.title
    })
  }
  render() {
    return (
      <View style={GolbalStyles.root_container}>
        <NavigationBar
          title={this.state.title}
          style={{backgroundColor:'rgb(277,104,81)'}}
          statusBar={{backgroundColor: 'rgb(277,104,81)'}}
          leftButton={ViewUtils.getLeftButton(this.goBack.bind(this))}
        />
        <WebView
          ref={'web_view'}
          source={{uri: this.state.url}}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
      </View>
    );
  }
}

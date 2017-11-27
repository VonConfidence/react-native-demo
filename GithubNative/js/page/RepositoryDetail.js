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
import ViewUtils from "../util/ViewUtils";

export default class RepositoryDetail extends Component<> {
  constructor(props) {
    super(props);
    this.url = this.props.navigation.state.params.item.html_url
    this.title = this.props.navigation.state.params.item.full_name;
    this.state = {
      url: this.url,
      title: this.title,
      canGoBack:false
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
      url: navState.url
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.state.title}
          style={{backgroundColor:'rgb(277,104,81)'}}
          statusBar={{backgroundColor: 'rgb(277,104,81)'}}
          leftButton={ViewUtils.getLeftButton(()=> this.goBack())}
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

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

import NavigationBar from './NavigationBar'

const URL = 'http://www.imooc.com'

export default class WebViewTest extends Component<> {
  constructor(props) {
    super(props);
    this.state = {
      url: URL,
      title: '',
      canGoBack:false
    }
  }
  goBack() {
    if (this.state.canGoBack) {
      this.refs['web_view'].goBack();
    } else {
      DeviceEventEmitter.emit('showToast', '到顶了')
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
      title: navState.title
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'WebViewTest'}
          style={{backgroundColor:'rgb(277,104,81)'}}
          statusBar={{backgroundColor: 'rgb(277,104,81)'}}
        />
        <View style={styles.row}>
          <Text onPress={this.goBack.bind(this)} style={styles.tips}>返回</Text>
          <TextInput style={styles.input} defaultValue={URL} onChangeText={text=> this.text = text}/>
          <Text onPress={this.go.bind(this)} style={styles.tips}>Go</Text>
        </View>
        <WebView
          ref={'web_view'}
          source={{uri: this.state.url}}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
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

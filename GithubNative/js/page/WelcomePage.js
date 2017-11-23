import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'

import { NavigationActions } from 'react-navigation'

import NavigationBar from '../common/NavigationBar'

export default class WelcomePage extends Component {
  componentDidMount() {

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'AppPage'})
      ]
    })

    this.timer = setTimeout(()=> {
      this.props.navigation.dispatch(resetAction)
    }, 2000)
  }
  componentWillMount() {
    this.timer && clearTimeout(this.timer)
  }
  render() {
    return (
      <View>
        <NavigationBar
          style={{backgroundColor:'red'}}
          statusBar={{backgroundColor:'rgb(234,32,0)'}}
          title={'欢迎'}
        />
        <Text>欢迎</Text>
      </View>
    )
  }
}
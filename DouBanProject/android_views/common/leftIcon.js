/*
  实现功能:
    封装返回按钮图标, 不使用图片

  包含组件

  外部传入
 */


import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class LeftIcon extends Component<{}> {
  render() {
    return (
      <View>
        <View style={styles.go}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  go: {
    width: 15,
    height: 15,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FFF',
    marginLeft: 10,
    transform: [{rotate: '45deg'}]  //将一个矩形框旋转45deg
  }
})

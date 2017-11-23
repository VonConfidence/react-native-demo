import React, {Component} from 'react'

import {
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Header extends Component<{}> {
  render() {
    return (
      <View style={headerStyles.flex}>
        <Text style={headerStyles.font}>
          <Text style={headerStyles.font_1}>网易</Text>
          <Text style={headerStyles.font_2}>新闻</Text>
          <Text>有态度</Text>
        </Text>
      </View>
    )
  }
}

// 样式
const headerStyles = StyleSheet.create({
  flex: {
    marginTop:25,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#EF2D36',
    alignItems: 'center'
  },
  // 字体的公共部分
  font: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  font_1: {
    color: '#CD1D1C',
  },
  font_2: {
    color: '#FFF',
    backgroundColor:"#CD1D1C"
  }
})

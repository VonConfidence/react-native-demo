/*
  实现功能: 封装搜索栏组件, 包含文本输入和搜索按钮

  包含组件:

  外部传入:
    输入框的按钮属性设置, placeholder, onPress, onChangeText
    使用...this.props将外部传入的属性设置给TextInput和TouchableOpacity

      注意: 指定高度, 边框颜色 边框线
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default class SearchBar extends Component<{}> {
  constructor(props) {
    super(props)
  }
  _inputBlur(){
    alert(this.refs.inputWR)
    //alert(this.refs.inputWR.blur())
  }
  _onPress() {
    this._inputBlur();
    this.props.onPress();
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.inputContainer}>
          <TextInput style={styles.input} {...this.props}  ref="inputWR" autoFocus={true}/>
        </ScrollView>
        <TouchableOpacity style={styles.btn} onPress={this._onPress.bind(this)}>
          <Text style={styles.search}>搜索</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 44,
    marginTop: 5,
  },
  inputContainer: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#fff',
    height: 40
  },
  input: {
    flex: 1,
    display:'flex',
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#666'
  },

  btn: {
    width: 55,
    height: 44,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'rgb(54, 179, 253)',
    borderColor: '#FF6366',
    borderRadius:4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign:'center',
    lineHeight: 32
  }
})
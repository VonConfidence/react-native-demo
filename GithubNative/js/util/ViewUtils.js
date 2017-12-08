import React from 'react'

import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native'

export default class ViewUtils {
  static getLeftButton(callback) {
     return <TouchableOpacity
       style={{padding: 8}}
       onPress={callback}
      >
       <Image style={{width: 26, height: 26, tintColor: 'white'}} source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
     </TouchableOpacity>
  }

  /**
   * 创建我的页面的选项卡
   * @param callback  单击选项卡的时候调用的回调
   * @param icon  左侧图标
   * @param text  显示的文本
   * @param tintStyle 图标着色
   * @param expandableIcon  右侧图标
   */
  static getSettingItem(callback, icon, text, tintStyle, expandableIcon) {
    return (
      <TouchableHighlight onPress={callback}>
        <View style={styles.setting_item_container}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={icon} resizeMode="stretch" style={[{width: 16, height: 16, marginRight: 10}, tintStyle]}/>
            <Text>{text}</Text>
          </View>
          <Image source={expandableIcon?expandableIcon: require('../../res/images/ic_tiaozhuan.png')} style={[{marginRight: 10,height: 22, width: 22}, {tintColor: '#2196F3'}]}/>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  setting_item_container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 60
  }
})
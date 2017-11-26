import React from 'react'

import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet
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
}
import React, {Component} from 'react'

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList
} from 'react-native'

import NavigationBar from '../../common/NavigationBar'
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'

import {
  StackNavigator
} from 'react-navigation'

import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'

class MyPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={"我的"}
          style={{backgroundColor: "#6495ED"}}
        />
        <Text style={styles.tips}
          onPress={()=> navigate('CustomKeyPage', {isRemoveKey:false, flag:FLAG_LANGUAGE.flag_key})}
          >自定义标签
        </Text>

        <Text style={styles.tips}
              onPress={()=> navigate('SortKeyPage', {flag: FLAG_LANGUAGE.flag_key})}
        >标签排序页
        </Text>

        <Text style={styles.tips}
              onPress={()=> navigate('CustomKeyPage', {isRemoveKey:true})}
        >标签移出
        </Text>

        <Text style={styles.tips}
              onPress={()=> navigate('CustomKeyPage', {isRemoveKey:false, flag:FLAG_LANGUAGE.flag_language})}
        >自定义语言
        </Text>
        <Text style={styles.tips}
              onPress={()=> navigate('SortKeyPage', {flag: FLAG_LANGUAGE.flag_language})}
        >语言排序页
        </Text>
      </View>
    )
  } // end render
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    borderWidth: 1,
    width: 40,
    textAlign: 'center'
  }
})

const MyPageNavigation = StackNavigator({
  // 我的主页跳转
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      header: null
    }
  },
  CustomKeyPage: {
    screen: CustomKeyPage,
    navigationOptions: {
      header: null
    }
  },
  SortKeyPage: {
    screen: SortKeyPage,
    navigationOptions: {
      header: null
    }
  }
})

export default MyPageNavigation
import React, {Component} from 'react'

import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView
} from 'react-native'

import NavigationBar from '../../common/NavigationBar'
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'

import WebViewPage from '../WebViewPage'
import RepositoryDetail from '../RepositoryDetail'

import GlobalStyles from '../../../res/styles/GolbalStyles'

import {
  StackNavigator
} from 'react-navigation'

import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'

import {MORE_MENU} from '../../common/MoreMenu'
import ViewUtils from "../../util/ViewUtils"
import AboutPage from "../About/AboutPage"
import AboutMePage from "../About/AboutMePage"

class MyPage extends Component {
  constructor(props) {
    super(props)
  }

  onClick(tab) {
    // alert(tab)
    const {navigate} = this.props.navigation;
    let navigateUrl = '';
    let params = {};
    switch (tab) {
      case MORE_MENU.Custom_Language: // 自定义语言
        navigateUrl = 'CustomKeyPage'
        params = {isRemoveKey: false, flag: FLAG_LANGUAGE.flag_language}
        break;
      case MORE_MENU.Custom_Key: // 自定标签
        navigateUrl = 'CustomKeyPage'
        params = {isRemoveKey: false, flag: FLAG_LANGUAGE.flag_key}
        break;
      case MORE_MENU.Remove_Key: // 删除标签
        navigateUrl='CustomKeyPage'
        params={isRemoveKey:true, flag: FLAG_LANGUAGE.flag_key}
        break;
      case MORE_MENU.Sort_Key: // 标签排序
        navigateUrl = 'SortKeyPage'
        params={flag: FLAG_LANGUAGE.flag_key}
        break;
      case MORE_MENU.Sort_Language: // 语言排序
        navigateUrl = 'SortKeyPage'
        params = {flag: FLAG_LANGUAGE.flag_language}
        break;
      case MORE_MENU.Custom_Theme: // 自定义主题
        break;
      case MORE_MENU.About_Author: // 关于作者
        navigateUrl = 'AboutMePage'
        break;
      case MORE_MENU.About: // 关于
        navigateUrl = 'AboutPage'
        break;
      default:
        break;
    }
    navigate(navigateUrl, params)
  }

  getItem(tag, icon, text) {
    return ViewUtils.getSettingItem(this.onClick.bind(this, tag), icon, text, {tintColor: '#2196F3'}, null)
  }

  render() {
    // const {navigate} = this.props.navigation;
    const navigationBar = (
      <NavigationBar
        title={"我的"}
        style={{backgroundColor: "#2196f3"}}
      />
    )
    return (
      <View style={GlobalStyles.root_container}>
        {navigationBar}
        <ScrollView>
          <TouchableHighlight onPress={this.onClick.bind(this, MORE_MENU.About)}>
            <View style={[styles.item, {height: 90}]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../../../res/images/ic_trending.png')}
                       style={[{width: 40, height: 40, marginRight: 10}, {tintColor: '#2196F3'}]}/>
                <Text>GitHub Popular</Text>
              </View>
              <Image source={require('../../../res/images/ic_tiaozhuan.png')}
                     style={[{marginRight: 10, height: 22, width: 22}, {tintColor: '#2196F3'}]}/>
            </View>
          </TouchableHighlight>
          <View style={GlobalStyles.line}/>

          {/*-------------趋势管理-------------------*/}
          <Text style={styles.groupTitle}>趋势管理</Text>
          {/*自定义预约*/}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Custom_Language, require('./images/ic_custom_language.png'), '自定义语言')}

          {/*语言排序*/}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Sort_Language, require('./images/ic_swap_vert.png'), '语言排序')}


          {/*--------------标签管理-----------*/}
          <View style={GlobalStyles.line}/>
          <Text style={styles.groupTitle}>标签管理</Text>

          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Custom_Key, require('./images/ic_custom_language.png'), '自定义标签')}

          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Sort_Key, require('./images/ic_swap_vert.png'), '标签排序')}

          {/*标签移除*/}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Remove_Key, require('./images/ic_remove.png'), '标签移除')}


          {/*--------设置--------------*/}
          <View style={GlobalStyles.line}/>
          <Text style={styles.groupTitle}>设置</Text>

          {/*自定义主题*/}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.Custom_Theme, require('./images/ic_view_quilt.png'), '自定义主题')}

          {/*关于作者*/}
          <View style={GlobalStyles.line}/>
          {this.getItem(MORE_MENU.About_Author, require('./images/ic_insert_emoticon.png'), '关于作者')}

        </ScrollView>
        {/*
        <Text style={styles.tips}
          onPress={()=> navigate('CustomKeyPage', {isRemoveKey:false, flag:FLAG_LANGUAGE.flag_key})}
          >自定义标签
        </Text>

        <Text style={styles.tips}
              onPress={()=> navigate('SortKeyPage', {flag: FLAG_LANGUAGE.flag_key})}
        >标签排序页
        </Text>

        <Text style={styles.tips}
              onPress={()=> navigate('CustomKeyPage', {isRemoveKey:true,flag:FLAG_LANGUAGE.flag_language})}
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
        */}
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
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 60,
    backgroundColor: 'white'
  },

  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray'
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
  },
  AboutMePage: {
    screen: AboutMePage,
    navigationOptions: {
      header: null
    }
  },
  AboutPage: {
    screen: AboutPage,
    navigationOptions: {
      header: null
    }
  },
  WebViewPage: {
    screen: WebViewPage,
    navigationOptions: {
      header: null
    }
  },
  RepositoryDetail: {
    screen: RepositoryDetail,
    navigationOptions: {
      header: null
    }
  }
})

export default MyPageNavigation
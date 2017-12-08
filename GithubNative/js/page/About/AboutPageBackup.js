import React, {Component} from 'react'

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  PixelRatio,
  Platform
} from 'react-native'

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtils from "../../util/ViewUtils"
import GlobalStyles from '../../../res/styles/GolbalStyles'

import {MORE_MENU} from '../../common/MoreMenu'

export default class AboutPage extends Component {
  constructor(props) {
    super(props)
  }
  onClick(tab) {
    // alert(tab)
    const {navigate} = this.props.navigation;
    let navigateUrl = '';
    let params = {};
    switch (tab) {
      case MORE_MENU.About_Author:
        navigateUrl = 'AboutAuthor'
        break;
      case MORE_MENU.WebSite:
        navigateUrl = 'WebSitePage'
        break;
      case MORE_MENU.Feedback:
        navigateUrl='FeedbackPage'
        break;
      default:
        break;
    }
    navigate(navigateUrl, params)
  }
  getParallaxRenderConfig(params) {
    let config = {};
    config.renderBackground = ()=> (
      <View key="background">
        <Image source={{
          uri: params.backgroundImg,
          width: window.width,
          height: PARALLAX_HEADER_HEIGHT
        }}/>
        <View style={{
          position: 'absolute',
          top: 0,
          width: window.width,
          backgroundColor: 'rgba(33,150,243,.4)',
          height: PARALLAX_HEADER_HEIGHT
        }}/>
      </View>
    );
    // 下拉下去 全部展示的时候的样式
    config.renderForeground = ()=> (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <Image style={styles.avatar} source={{
          uri: params.avastar,
          width: AVATAR_SIZE,
          height: AVATAR_SIZE
        }}/>
        <Text style={styles.sectionSpeakerText}>
          {params.name}
        </Text>
        <Text style={styles.sectionTitleText}>
          {params.description}
        </Text>
      </View>
    );

    // 渲染滑动上去的时候的版面
    config.renderStickyHeader=()=>(
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{params.name}</Text>
      </View>
    );

    // 一直挂载在不动的位置的样式  (返回按钮)
    config.renderFixedHeader = ()=> (
      <View key="fixed-header" style={styles.fixedSection}>
        {ViewUtils.getLeftButton(()=> this.props.navigation.goBack())}
      </View>
    );
    return config;
  }
  renderView(contentView, params) {
    const { onScroll = () => {} } = this.props;
    let renderConfig = this.getParallaxRenderConfig(params);
    return (
      <ParallaxScrollView
        headerBackgroundColor="#2196F3"
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}
        {...renderConfig}
      >
        {contentView}
      </ParallaxScrollView>

    )
  }
  render() {
    let content = (
      <View>
        {ViewUtils.getSettingItem(this.onClick.bind(this), require('../../../res/images/ic_computer.png'), MORE_MENU.WebSite, {tintColor: '#2196F3'})}
        <View style={GlobalStyles.line}/>
        {ViewUtils.getSettingItem(this.onClick.bind(this), require('../../page/My/images/ic_insert_emoticon.png'), MORE_MENU.About_Author, {tintColor: '#2196F3'})}
        <View style={GlobalStyles.line}/>

        {ViewUtils.getSettingItem(this.onClick.bind(this), require('../../../res/images/ic_feedback.png'), MORE_MENU.Feedback, {tintColor: '#2196F3'})}
        <View style={GlobalStyles.line}/>

      </View>
    )
    return this.renderView(content, {
      'name': 'GitHub Popular',
      'description': '2017年最后一个月！愿这个月一切顺利，坚持你所热爱的，热爱你所坚持的，剩下的，交给时间就好。愿我们都能在寒冷的冬日里有一颗温暖的心！ ',
      'avastar': 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2292885209,3021801418&fm=58&w=100&h=100&img.JPEG',
      "backgroundImg": 'http://imgsrc.baidu.com/forum/w%3D580/sign=3988702ab2014a90813e46b599763971/6f6d69310a55b319cc5b4ded48a98226cefc1732.jpg'
    })
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS==='ios'?20:0,
    backgroundColor: '#2196F3'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    paddingRight: 9,
    flexDirection:'row',
    alignItems: 'center',
    paddingTop: (Platform.OS==='ios')?20:0,
    justifyContent: 'space-between'
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 12,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});
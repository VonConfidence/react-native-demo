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
  Platform,
  Linking,
  DeviceEventEmitter,
  Clipboard
} from 'react-native'

import ViewUtils from "../../util/ViewUtils"
import GlobalStyles from '../../../res/styles/GolbalStyles'

import {MORE_MENU} from '../../common/MoreMenu'
import AboutCommon, {FLAG_ABOUT} from './AboutCommon'

import Config from '../../../res/data/config.json'


const FLAG = {
  REPOSITORY: '开源项目',
  BLOG: {
    name: '技术博客',
    items: {
      PERSONAL_BLOG: {
        title: '个人博客',
        url: 'http://jiapenghui.com',
      },
      CSDN: {
        title: 'CSDN',
        url: 'http://blog.csdn.net/fengyuzhengfan',
      },
      JIANSHU: {
        title: '简书',
        url: 'http://www.jianshu.com/users/ca3943a4172a/latest_articles',
      },
      GITHUB: {
        title: 'GitHub',
        url: 'https://github.com/VonConfidence',
      },
    }
  },
  CONTACT: {
    name: '联系方式',
    items: {
      QQ: {
        title: 'QQ',
        account: '2478591660',
      },
      Email: {
        title: 'Email',
        account: 'guarddreamer@gmail.com',
      },
    }
  },
  QQ: {
    name: '技术交流群',
    items: {
      MD: {
        title: '移动开发者技术分享群',
        account: '335939197',
      },
      RN: {
        title: 'React Native学习交流群',
        account: '165774887',
      }
    },
  },

};

export default class AboutMePage extends Component {
  constructor(props) {
    super(props)
    this.aboutCommon = new AboutCommon(this.props, this.updateState.bind(this), FLAG_ABOUT.flag_about_me, Config)
    this.state = {
      projectModels: [],
      author: Config.author,
      showRepository: false, // 展开页面, 默认不显示
      showBlog: false,
      showQQ: false,
      showContact: false
    }
  }

  componentDidMount() {
    this.aboutCommon.componentDidMount()
  }

  updateState(dic) {
    // console.log('AboutPage: updateState==> ', dic)
    this.setState(dic);
  }

  onClick(tab) {
    // alert(tab)
    const {navigate} = this.props.navigation;
    let navigateUrl = '';
    let params = {};
    switch (tab) {
      case FLAG.REPOSITORY:
        this.updateState({showRepository:!this.state.showRepository})
        break;
      case FLAG.BLOG:
        this.updateState({showBlog:!this.state.showBlog})
        break;
      case FLAG.CONTACT:
        this.updateState({showContact:!this.state.showContact})
        break;
      case FLAG.QQ:
        this.updateState({showQQ:!this.state.showQQ})
        break;
      case FLAG.CONTACT.items.QQ:
        Clipboard.setString(tab.account);
        DeviceEventEmitter.emit('showToast', 'QQ: '+tab.account+' 已经复制到粘贴板')
        break;
      case FLAG.QQ.items.MD:
      case FLAG.QQ.items.RN:
        Clipboard.setString(tab.account);
        DeviceEventEmitter.emit('showToast', '群号: '+tab.account+' 已经复制到粘贴板')
        break;
      case FLAG.BLOG.items.PERSONAL_BLOG:
      case FLAG.BLOG.items.CSDN:
      case FLAG.BLOG.items.JIANSHU:
      case FLAG.BLOG.items.GITHUB:
        DeviceEventEmitter.emit('showToast', tab.url+':'+tab.title)
        navigateUrl = 'WebViewPage';
        params= {
          url: tab.url,
          title: tab.title
        }
        break;
      case FLAG.CONTACT.items.Email:
        var url='mailto://' + tab.account;
        Linking.canOpenURL(url).then(supported=> {
          if (!supported) {
            return DeviceEventEmitter.emit('showToast', '不支持邮件发送协议')
          } else {
            return Linking.openURL(url)
          }
        })
        break;
      default:
        break;
    }

    if (navigateUrl) {
      navigate(navigateUrl, params)
    }
  }

  /**
   *  获取Item的右侧图标
   * @param isShow
   */
  getClickIcon(isShow) {
    return isShow ? require('../../../res/images/ic_tiaozhuan_up.png') : require('../../../res/images/ic_tiaozhuan_down.png')
  }

  /**
   * 显示FLAG数据的下的每一项
   * @param dict  显示的列表数据
   * @param isShowAccount  标识显示qq的时候 title和url都要显示 而其他选项只显示title
   */
  renderItems(dict, isShowAccount) {
    // alert(1)
    console.log('dict --->', dict)
    if (!dict) {
      return;
    }
    let views = [];
    console.log(Object.entries(dict))
    for (let [key, item] of Object.entries(dict)) {
      console.log(key, item)
      let title = isShowAccount ? item.title + ':' + item.account : item.title;
      views.push(
        <View key={key}>
          {ViewUtils.getSettingItem(this.onClick.bind(this, item), null, title, {tintColor: '#2196F3'})}
          <View style={GlobalStyles.line}/>
        </View>
      )
    }
    return views;
  }

  render() {
    let content = (
      <View>
        {ViewUtils.getSettingItem(this.onClick.bind(this, FLAG.REPOSITORY), require('../../../res/images/ic_code.png'), FLAG.REPOSITORY, {tintColor: '#2196F3'}, this.getClickIcon(this.state.showRepository))}
        <View style={GlobalStyles.line}/>
        {
          this.state.showRepository ? this.aboutCommon.renderRepository(this.state.projectModels) : null
        }

        {ViewUtils.getSettingItem(this.onClick.bind(this, FLAG.BLOG), require('../../../res/images/ic_computer.png'), FLAG.BLOG.name, {tintColor: '#2196F3'}, this.getClickIcon(this.state.showBlog))}
        <View style={GlobalStyles.line}/>
        {
          this.state.showBlog ? this.renderItems(FLAG.BLOG.items) : null
        }



        {ViewUtils.getSettingItem(this.onClick.bind(this, FLAG.CONTACT), require('../../../res/images/ic_computer.png'), FLAG.CONTACT.name, {tintColor: '#2196F3'}, this.getClickIcon(this.state.showContact))}
        <View style={GlobalStyles.line}/>
        {
          this.state.showContact ? this.renderItems(FLAG.CONTACT.items, true) : null
        }

        {ViewUtils.getSettingItem(this.onClick.bind(this, FLAG.QQ), require('../../../res/images/ic_contacts.png'), FLAG.QQ.name, {tintColor: '#2196F3'}, this.getClickIcon(this.state.showQQ))}
        <View style={GlobalStyles.line}/>
        {
          this.state.showQQ ? this.renderItems(FLAG.QQ.items, true) : null
        }


      </View>
    )
    return (
      <View style={styles.container}>
        {this.aboutCommon.renderView(content, this.state.author)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
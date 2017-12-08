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
import Utils from "../../util/Utils"

export const FLAG_ABOUT = {flag_about: 'about', flag_about_me: 'flag_about_me'}

import FavoriteDao from '../../expand/dao/FavoriteDao'
import {FLAG_STORAGE} from "../../expand/dao/DataRepository"
// import ProjectModel from "../../model/ProjectModel";
import RepositoryCell from "../../common/RepositoryCell"

import RepositoryUtils from '../../expand/dao/RepositoryUtils'

export default class AboutCommon {
  constructor(props, updateState, flag_about,config) {
    this.props = props;
    this.updateState = updateState; // updateState <Function>
    this.flag_about = flag_about;
    this.config = config;
    this.repositories = [];
    this.favoriteKeys = null;
    this.favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_my)
    this.repositoryUtils = new RepositoryUtils(this)
  }
  componentDidMount() {
    // 关于页面进行调用
    if (this.flag_about === FLAG_ABOUT.flag_about) {
      // https://api.github.com/repos/crazycodeboy/GitHubPopular
      this.repositoryUtils.fetchRepository(this.config.info.currentRepoUrl)
      //fetch 完成之后 updateData  然后调用aboutCommon里面的onNotifyDataChanged
    } else { // 关于作者页面进行调用  需要加载一批的数据
      var urls = [];
      var items = this.config.items;
      items.map((item, index)=> {
        urls.push(this.config.info.url+item)
      })
      // 获取所有的开元项目
      this.repositoryUtils.fetchRepositories(urls)
    }
  }
  /**
   * 通知数组发生了改变
   * @param items 改变只有的数据
   */
  onNotifyDataChanged(items) {
    // console.log('AboutCommont::onNotifyDataChanged--> ', items)
    this.updateFavorite(items);
  }

  /**
   * async 表示函数是异步方法 里面有异步处理
   * await 表示后面的参数方法是一个异步的操作
   * 更新项目的用户收藏状态
   * async updateFavorite
   * @param repositories
   */
  updateFavorite(repositories) {
    if (!repositories) return;
    this.repositories = repositories
    // 如果favoriteKeys没有的话
    if (!this.favoriteKeys) {
      // this.favoriteKeys = await this.favoriteDao.getFavoriteKeys();
      this.favoriteDao.getFavoriteKeys().then(result=> {
        this.favoriteKeys = result;
        let projectModels = [];
        repositories.forEach((repository, index) => {
          // new ProjectModel(repository, Utils.checkFavorite(repository, this.favoriteKeys?this.favoriteKeys:[]))
          var item=repository.item ? repository.item : repository;
          projectModels.push({
            // 检查该项有没有被收藏过
            isFavorite: Utils.checkFavorite(item, this.favoriteKeys ? this.favoriteKeys : []),
            item
          })
        })
        this.updateState({
          projectModels
        })

      });
    }
    /*
    let projectModels = [];
    repositories.forEach((repository, index) => {
      // new ProjectModel(repository, Utils.checkFavorite(repository, this.favoriteKeys?this.favoriteKeys:[]))
      var item=repository.item ? repository.item : repository;
      projectModels.push({
        isFavorite: Utils.checkFavorite(item, this.favoriteKeys ? this.favoriteKeys : []),
        item
      })
    })
    this.updateState({
      projectModels
    })
    */
  }

  /**
   * 常见项目视图
   * @param projectModels
   * @returns {Array?[Component]}
   */
  renderRepository(projectModels) {
    if (!projectModels || projectModels.length == 0) {
      return null;
    }
    let views = projectModels.map((projectModel, index) => {
      return (
        <RepositoryCell
          key={projectModel.item.id}
          projectModel={projectModel}
          onSelect={this.onSelect.bind(this, projectModel)}
          onFavorite={this.onFavorite.bind(this)}
        />
      )
    })

    return views;
  }

  // 点击的RepositoryCell的时候 调用方法
  onSelect(projectModel) {
    this.props.navigation.navigate('RepositoryDetail', {projectModel: projectModel, flag: FLAG_STORAGE.flag_popular})
  }

  // 用户点击FavoriteIcon的时候改变用户的收藏状态
  onFavorite(item, isFavorite) {
    //处理一些数据库的操作
    if (isFavorite) {
      this.favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item))
    } else { // 用户取消收藏
      this.favoriteDao.removeFavoriteItem(item.id.toString())
    }
  }

  getParallaxRenderConfig(params) {
    let config = {};
    config.renderBackground = () => (
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
    config.renderForeground = () => (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <Image style={styles.avatar} source={{
          uri: params.avatar,
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
    config.renderStickyHeader = () => (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{params.name}</Text>
      </View>
    );

    // 一直挂载在不动的位置的样式  (返回按钮)
    config.renderFixedHeader = () => (
      <View key="fixed-header" style={styles.fixedSection}>
        {ViewUtils.getLeftButton(() => this.props.navigation.goBack())}
      </View>
    );
    return config;
  }

  renderView(contentView, params) {
    const {
      onScroll = () => {
      }
    } = this.props;
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
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
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
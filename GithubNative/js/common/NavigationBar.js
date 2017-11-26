import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform
} from 'react-native';

import PropTypes from 'prop-types';

const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;

const STATUS_BAR_HEIGHT = 20;

// statusBar的样式属性校验配置
const StatusBarShape = {
  backgroundColor: PropTypes.string, // 状态栏背景色
  barStyle:PropTypes.oneOf(['default', 'light-content', 'dark-content']), // 以具名显示还是非具名显示 属性约束
  hidden: PropTypes.bool, // 允许用户设置状态栏隐藏
}

export default class NavigationBar extends Component<> {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      hide: false, // 默认不隐藏
    }
  }

  render() {
    // 状态栏
    let status = <View style={[styles.statusBar, this.props.statusBar ]}>
      <StatusBar style={[{barStyle:'line-content', hidden:false},this.props.statusBar]}/>
    </View>

    let titleView = this.props.titleView ? this.props.titleView : <Text style={styles.title}>{this.props.title}</Text>

    // 导航栏内容
    let content = (
      <View style={styles.navBar}>
          {this.props.leftButton}
          <View style={styles.titleViewContainer}>
            {titleView}
          </View>
        {this.props.rightButton}
      </View>
    )
    return (
      <View style={[styles.container, this.props.style]}>
        {status}
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2196F3' // 默认是灰色, 会被覆盖掉
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    // backgroundColor: 'dodgerblue'
  },
  titleViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  statusBar: {
    height: Platform.OS === 'ios'?STATUS_BAR_HEIGHT: 0,
  }
});

NavigationBar.propTypes = {
  style: View.propTypes.style,
  title: PropTypes.string,
  titleView: PropTypes.element,
  hide: PropTypes.bool,            // 状态栏是否隐藏
  leftButton: PropTypes.element, // 左侧按钮类型
  rightButton: PropTypes.element,  // 右侧按钮类型
  statusBar: PropTypes.shape(StatusBarShape), // 用户可以自定义状态栏
};

// 属性默认值
// NavigationBar.defaultProps = {
//   statusBar: {
//       barStyle: 'light-content',
//       hidden: false
//   }
// };


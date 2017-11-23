# Github 项目实现

## 软件开发流程
1. UI界面设计
2. 需求分析
    - 订阅功能 - 取消订阅
    - 收藏 - 分享
    - 多彩主题
    - 统计打点
3. 编码开发
    - App启动-启动页(读取配置文件)-状态初始化(读取服务器配置, 更新本地数据状态)- 首页
    - 最热 (搜索-收藏-查看  菜单-标签操作-分享-反馈-关于-自定义主题)
    - 详情 (查看-分享)
    - 趋势 时间-菜单(语言排序, 自定义语言主题, 分享, 反馈, 关于)
    - 列表 (离线缓存下拉刷新 收藏项目) 菜单
    - 我的
    + `高级功能`
        - 多彩主题(控制导航,菜单栏)
        - 启动白屏问题解决
        - Native组件的封装(AndroidStudio, Xcode)
        - 统计分享(CodePush)打点
        - 热更新的实现
4. 测试
5. 上线
    - 市场发布

## 技术分解
1. Javascript
2. ES5/6
3. React
4. ReactNative
5. FlexBox   布局方案
6. AsyncStorage 数据存储
7. Fetch 网络数据
8. NativeModules 原生模块
9. Android&iOS
10. 第三方库的使用
    - react-native-check-box
    - react-native-easy-toast  (toast提示框)
    - react-native-splash-screen (启动屏)
    - react-native-htmlview (html渲染)
    - react-native-scrollable-tab-view (标签切换)
    - reat-native-sortable-listview (列表排序)
    - react-native-tab-navigator(底部导航)
    - react-native-parallax-scroll-view(视差滚动)
    - 分享SDK
11. 自定义组件
    - NavigationBar
    - MoreMenu
    - 启动屏
    - 复选框
    - 提示框

12. 高层封装
    - 网络操作封装
    - 数据库操作封装
    - 数据解析封装
    - Promise封装

## 项目结构
1. res 全局文件(图片, 音频等文件)
2. js
    - common 可复用组件(非完整页面)
    - expand 扩展
    - page 完整页面
    - config 配置项(常量, 接口地址, 路由, 多语言化等配置)
    - util 工具类(非UI组件)


## 项目开发
1. yarn add [react-native-tab-navigator](https://github.com/happypancake/react-native-tab-navigator)

2. 启动引导流程详解
    - App启动->启动页(读取配置文件)->状态初始化(从服务器获取配置, 更新本地数据状态) -> 首页

3. App启动
    - 加载RN引擎
    - index.js js部分入口
    - setup.js 相关组件以及服务初始化
    - welcomePage 欢迎轮播图
    - homePage
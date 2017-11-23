# React && ReactNative 笔记

## 1. create-react-app
   - npm install -g create-react-app /* 安装create-react-app，建议使用cnpm */
   - create-react-app my-app   /* 使用命令创建应用，myapp为项目名称 */
   - cd my-app  /* 进入目录，然后启动 */
   - npm start

## 2. ReactNative
1. 移动平台前端分类
    - NativeApp
        - 性能优越, 功能强大
        - 版本维护和更新体验不好
    - WebApp
        - 开发成本低, 升级简单
        - 与原生App性能和交互体验有不小的差距
    - HybridApp
        - 混合开发, 介于Native和Web之间
        - React 设计理念
        - ReactJs 网页开发
        - ReactNative 移动应用开发

2. React [quick start](http://css88.com/react/docs/hello-world.html)
    - 简介
    - 开发环境配置
    - 创建React工程
        - 创建项目文件
        - React工程模板
        - react-demo
        - JSX语法
    - 组件
        - 定义组件
        - 组件的样式
        - 复合组件
    - props
        - this.props
        - ...this.props
        - this.props.children 表示组件中所有的子节点 (Vue组件下的插槽slot)
        - PropTypes(属性验证) (15.5以后使用prop-types)
        - defaultProps设置组件属性的默认值
    - state
        - 事件处理
        - this.state
        - 表单的基本使用
    - 组件的声明周期
        - 生命周期
            + Mounting/组件挂载相关
                - componentWillMount 组件将要挂载, render之前执行,仅执行一次, 即使多次重复渲染该组件, 或者改变组件的state
                - componentDidMount 组件已经挂载, render之后执行, 同一个组件重复渲染只执行一次
            + Updating/组件更新相关
                - componentWillReceiveProps(object nextProps) 已经挂载的组件接收到新的props之前调用, 注意组件初始化渲染时则不会执行
                - shouldComponentUpdate(object nextProps,object nextState)
                组件判断是否重新渲染时调用, 该接口实际是在组件接收到了新的props或者新的state的时候 会立即调用, 然后通过
                - componentWillUpdate(object nextPropsm objext nextState) 组件将要更新
                - componentDidUpdate(object nextPropsm objext nextState) 组件已经更新
            + Unmounting/组件移除相关
                - componentWillUnmount 在组件将要被移除之前的时间点触发, 可以利用该方法来执行一些必要的清理组件
            + 生命周期中与props和state相关
                - getDefaultProps 设置props属性默认值
                - getIntialState 设置state属性默认值
        - 各个阶段
            1. 创建阶段creating
                - 只调用getDefaultProps方法
            2. 实例化阶段Mounting
                - getInitialState
                - componentWillMount
                - render
                - componentDidMount
            3. 更新阶段Updating
                - componentWillReceiveProps
                - shouldComponentUpdate 如果返回值是false, 后面的方法不会执行
                - componentWillUpdate
                - render
                - componentDidUpdate
            4. 销毁阶段
                - componentWillUnmount
3. 特点
    - 作为UI
    - 虚拟DOM
    - 组件化

## React Native
1. RN简介
    - 背景
    - 特点

2. RN开发环境配置
    - 开发环境介绍
        - ATOM插件 Nuclide - inspector
    - 配置流程
        - Android_Studio SDK_Manager
        - 在SDK Platforms窗口中，选择Show Package Details，然后在Android 6.0 (Marshmallow)中勾选`Google APIs`、`Android SDK Platform 23`、`Intel x86 Atom System Image`、`Intel x86 Atom_64 System Image`以及`Google APIs Intel x86 Atom_64 System Image`。
        - 在SDK Tools窗口中，选择Show Package Details，然后在Android SDK Build Tools中勾选`Android SDK Build-Tools 23.0.1`（必须包含有这个版本。当然如果其他插件需要其他版本，你可以同时安装其他多个版本）。然后还要勾选最底部的Android Support Repository.
    - 环境变量配置
        - ANDROID_HOME: D:\AndroidSDK_MS\android-sdk
        - JAVA_HOME: C:\Program Files\Java\jdk1.8.0_121

        - path 添加配置
            - ;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;
            - D:\MongoDB\bin;
            - C:\Program Files (x86)\Git\bin;
            - D:\Program Files\nodejs\;
            - C:\Python\Python27;C:\Python\Python27\Scripts;
            - C:\Python\Python36;C:\Python\Python36\Scripts;
            - D:\AndroidSDK_MS\android-sdk\tools; D:\AndroidSDK_MS\android-sdk\platform-tools

3. RN项目创建以及结构分析
    - 创建RN项目
        - npm install react-native-cli -g
        - react-native init HelloWorld

            ```
            To run your app on iOS:
               cd D:\FrontEnd\WebstormProject\React_Native\HelloNative
               react-native run-ios
               - or -
               Open ios\HelloNative.xcodeproj in Xcode
               Hit the Run button
            To run your app on Android:
               cd D:\FrontEnd\WebstormProject\React_Native\HelloNative
               Have an Android emulator running (quickest way to get started), or a device connected
               react-native run-android
            ```

         - `运行package`
            - 在命令行中进入项目目录HelloWorld，输入react-native start，等待一段时间(需要下载很多东西)
            - 这时候可以用浏览器访问(http://localhost:8081/index.bundle?platform=android)， 如果可以访问表示服务器端已经可以了, 这里使用的版本号是"react": "16.0.0","react-native": "0.50.1"
            - 注意老版本（低于0.49）的地址为 (http://localhost:8081/index.android.bundle?platform=android)
            - 如果你遇到了`ERROR Watcher took too long to load`的报错，请尝试修改node_modules/react-native/packager/react-packager/src/FileWatcher/index.js，将其中的MAX_WAIT_TIME 从25000改为更大的值（单位是毫秒）

        - 设备调试(使用bluestacks)
            - adb kill-server 关闭服务器
            - abd start-server 开启服务器
            - adb devices 查看设备
        - `Android运行`
            - 保持packager开启，另外打开一个命令行窗口，然后在工程目录下运行
            - 执行命令: react-native run-android
            - 首次运行需要等待数分钟并从网上下载gradle依赖 (翻墙吧, 少年) (https://services.gradle.org/distributions/) 安装目录: C:\Users\Confidence\.gradle\wrapper\dists\gradle-2.14.1-all\8bnwg5hd3w55iofp58khbp6yv\
        - 推荐使用方法
            - 打开HelloNative\android\gradle\wrapper目录下的gradle-wrapper.properties文件
                - 将distributionUrl后面的链接改为国内镜像地址 http://mta.zttit.com:8080/images/gradle-2.14.1-all.zip
                - 进入项目目录HelloNative，输入react-native run-android（不要关闭package的命令行）。
                - 此时bluestacks已经安装上了此应用，如果没有可以在HelloNative\android\app\build\outputs\apk目录下找到app-debug.apk文件即是生成的安装包
            - 错误处理方法
                1. 如果apk安装运行出现报错，请检查上文中安装SDK的环节里所有依赖是否都已装全，platform-tools是否已经设到了PATH环境变量中，运行adb devices能否看到设备。
                2. 至此，应该能看到APP红屏报错，这是正常的，我们还需要让app能够正确访问pc端的packager服务。
                3. 摇晃设备或按Menu键（Bluestacks模拟器按键盘上的菜单键，通常在右Ctrl的左边 或者左Windows键旁边），可以打开调试菜单，点击`Dev Settings`，选`Debug server host for device`，输入你的正在运行packager的那台电脑的局域网IP加:8081（同时要保证手机和电脑在同一网段，且没有防火墙阻拦），再按back键返回，再按Menu键，在调试菜单中选择Reload JS，就应该可以看到运行的结果了。

                如果真实设备白屏但没有弹出任何报错，可以在安全中心里看看是不是应用的“悬浮窗”的权限被禁止了。

    - 项目结构分析
        - index.android.js `android入口文件`
        - index.ios.js `ios入口文件`
    - RN代码执行逻辑
    - RN继承IOS应用
    - RN调试

4. StyleSheets样式表
    - StyleSheets.create
    - 书写格式(与H5区别)
    - 拼接样式

5. FlexBox布局
    - 弹性盒子模型介绍(布局模型, 属性介绍)
    - RN中使用Flexbox(属性, flex)

6. View组件
    - 类似于div, 是最基本的组件
7. Text组件
    - onPress 手指触摸事件
    - numberOfLines 显示多少行
    - 可以设置字体颜色, 大小, 对齐方式等样式
8. Touchable组件
    - TouchableOpacity 给组件绑定事件 透明触摸,点击时出现透明过渡效果
    - TouchableHighlight 高亮触摸, 点击时高亮效果
    - TouchableWithoutFeedback 无反馈触摸, 点击无视觉变化

9. TextInput组件
    - placeholder占位符
    - value 默认值
    - password 是否密码输入
    - editable 是否可以编辑
    - returnKeyType 键盘return键类型
    - onChange 文本发生变化的时候
    - onEndEditing 当结束编辑的时候调用
    - onSubmitEditing 当结束编辑, 点击提交按钮的时候调用
10. Image组件 - 显示图片
    - resizeMode 图片适应模式conver, contain, stretch
    - source 图片的引用地址
    - IOS支持属性: onLoad, onLoadEnd, onLoadStart, onProgress

11. ScrollView组件
12. ListView组件
13. Navigator组件
    - yarn add react-navigation
14. TabBarIOS组件
15. 网络
    - promise方法链
    - Fetch实现数据请求


## RN项目实战
1. 实战开发
2. 真机测试

## 图书电影项目
1. 项目设计
    - 图书
        - 列表页面(搜索功能)
        - 详情页面(自定义布局)
    - 电影
        - 列表页面(搜索功能)
        - 详情页面(WebView)
2. 模块划分
    - 公共模块
        1. 工具类
            - 获取屏幕size
            - 基于Fetch的get请求
            - loading组件
        2. Navigator封装
            - 每个模块都需要Navigator控制页面导航
        3. Header封装
            - 图书详情, 电影都需要展示header
        4. 搜索框封装
            - 图书列表和电影列表都需要添加检索框
        5. API接口
            - 图书搜索
            - 图书详情
            - 电影搜索
    - 图书模块
        1. 图书列表
        2. 图书Item组件
        3. 图书详情
    - 电影模块
        1. 电影列表
        2. 电影列表Item(行组件)

3. 项目的API接口
    - 豆瓣APIv2: [豆瓣](https://developers.douban.com/wiki/?title=api_v2)
    - 图书APIv2: [图书](https://developers.douban.com/wiki/?title=book_v2)
    - 电影APIv2: [电影](https://developers.douban.com/wiki/?title=movie_v2)

    1. 接口测试
        - https://developers.douban.com/v2/book/search?q=图书关键字&count=查询数据数量&start=查询数据偏移量&tag=图书的标签


4. React-Navigation 传递参数和接收数据
    ```js
    // 传递参数
    onPress={()=> this.props.navigation.navigate('BookDetail', {bookID:item.id})}

    // 接收参数
    this.props.navigation.state.params.bookID

    // 点击返回
    onPress={()=> this.props.navigation.goBack();}
    ```



## android 真机打包测试
0. 项目的根路径是DemoProject

1. 生成签名秘钥
    ```
    cd DemoProject && mkdir mykeystore
    keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
    ```

    上面这一步会让输入签名信息 地址-姓名-密码等

    --alias 参数后面的别名my-key-alias是你将来为应用签名时所需要用到的，所以记得记录这个别名。

    记住上面命令输入完成后让你输入的密码

2. 设置gradle变量
    - 把my-release-key.keystore文件放到你工程中的android/app文件夹下。

    - 编辑 C:\Users\Confidence\.gradle\gradle.prpperties （没有这个文件你就创建一个）

        ```
        MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
        MYAPP_RELEASE_KEY_ALIAS=my-key-alias
        MYAPP_RELEASE_STORE_PASSWORD=*****
        MYAPP_RELEASE_KEY_PASSWORD=*****
        ```

3. 添加签名到应用的gradle配置中：
    - 编辑你项目目录下的android/app/build.gradle，添加如下的签名配置

    ```
    android {
        ...
        defaultConfig { ... }
        signingConfigs {
                release {
                    storeFile file("D:\\FrontEnd\\WebstormProject\\React_Native\\DouBanProject\\android\\app\\my-release-key.keystore")
                    storePassword "fengzixin"
                    keyAlias "my-key-alias"
                    keyPassword "fengzixin"
                }
            }
        buildTypes {
            release {
                ...
                signingConfig signingConfigs.release
            }
        }
    }
    ```

4. 生成release版本的APK：
    - npm start
    - mkdir -p android/app/src/main/assets
    - curl http://10.10.1.174:8081/index.bundle?platform=android
    - cd android && ./gradlew assembleRelease
    - 解释：首先我们新建了一个assets目录来存储打包的JavaScript文件然后通过curl从ReactNative包管理器中获取JavaScript文件。最后使用gradlew来构建release版本的APK

    - `在根路径下面DemoProject/android/app/build/outputs/apk 目录下面`
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/**
 * 第一部分: 导入ReactNative的包
 *    AppRegistry: JS运行所有的ReactNative应用的入口
 *    StyleSheet: ReactNative中使用的样式表, 类似CSS样式表
 *    Text, View 开发中所需要使用的组件
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

class LessonStyle extends Component<{}> {
  render() {
    /*
      位置居于后面的样式的权重比在前面的高
    */
    return (
      <View style={styles.vcontainer}>
        <View style={[styles.top, styles.border]}></View>
        <View style={[styles.bottom, styles.border, {borderWidth: 1}]}></View>
      </View>
    )
  }
}

class LessonFlex extends Component<{}> {
  render() {
    return (
      <View style={flexStyles.container}>
        <View style={[flexStyles.child1]}>
        </View>
        <View style={[flexStyles.child2, {borderWidth: 1, borderColor: 'black'}]}>
        </View>
      </View>
    )
  }
}

var flexStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    // width: 300,
    // height: 500,
    backgroundColor: 'dodgerblue',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  child1: {
    // width: 100,
    // height: 100,
    flex: 1,
    backgroundColor: 'cyan'
  },
  child2: {
    // width: 100,
    // height: 100,
    flex: 2,
    backgroundColor: 'red'
  },
})

/**
 * 第二部分: 创建RN组件
 *    模板中使用的ES6语法
 */
class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! FlexBoxLayout
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js FlexBox
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}


/**
 * 第三部分: 创建样式实例
 *  StyleSheet.create
 *  在应用中只会被创建一次: 不会每次在渲染周期中重新创建
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  vcontainer: {
    marginTop: 25,
    marginLeft: 30,
    backgroundColor: 'red',
    width: 300,
    height: 400
  },
  top: {
    backgroundColor: 'dodgerblue',
    width: 280,
    height: 250,
    margin: 10,
  },
  bottom: {
    backgroundColor: 'yellow',
    width: 280,
    height: 110,
    margin: 10,
  },
  border: {
    borderWidth: 3,
    borderColor: 'black'
  }
});

// 第四部分: 在App.js中


class LessonView extends Component<{}> {
  render() {
    return (
      <View style={[viewStyles.container, viewStyles.flex]}>
        <View style={viewStyles.item}>
          <View style={[viewStyles.flex, viewStyles.center]}>
            <Text>酒店</Text>
          </View>
          <View style={[viewStyles.flex, viewStyles.lineLeftRight]}>
            <View style={[viewStyles.flex, viewStyles.center, viewStyles.lineCenter]}>
              <Text>海外酒店</Text>
            </View>
            <View style={[viewStyles.flex, viewStyles.center]}>
              <Text>特价酒店</Text>
            </View>
          </View>
          <View style={[viewStyles.flex]}>
            <View style={[viewStyles.flex, viewStyles.center, viewStyles.lineCenter]}>
              <Text>团购</Text>
            </View>
            <View style={[viewStyles.flex, viewStyles.center]}>
              <Text>名宿, 客栈</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const viewStyles = StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: '#F2F2F2',
  },
  // 多个组件都需要设置的样式单独提取处理
  flex: {
    flex: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FF607C',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    height: 80,
    borderRadius: 5
  },
  // 给中间的区域设置左右的边线
  lineLeftRight: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'white',
  },
  // 给上面区域设置一个下边线
  lineCenter: {
    borderBottomWidth: 1,
    borderColor: 'white'
  }
});

// 引入组件
import Header from './components/header'
import News from './components/news'

// Text 组件
class LessonText extends Component<{}> {
  render() {
    var newsArray = [
      '1, [React] 从入门到开发',
      '2, [gulp] 最好用的Gulp构建工具',
      '3, [git] 前端必备分布式版本控制系统',
      '4, [babel] 前端必备模块打包机- 最好用的Gulp构建工具 - webpack - grunt - babel',
      '5, [Node全解] Vue实战项目-个人博客 - 全栈工程师之nodejs图片上传, AngularJS全面解析,最接近原生APP的高性能前端框-MUI, ES6标准入门',
    ];
    return (
      <View style={textStyles.flex}>
        {/*Header*/}
        <Header></Header>
        {/*News*/}
        <News newsArray={newsArray}></News>
      </View>
    )
  }
}

const textStyles = StyleSheet.create({
  flex: {
    flex: 1
  }
})

class LessonTextInput extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    }
  }

  // 输入框的onChange实现
  getContent(inputText) {
    this.setState({inputText})
  }

  clickBtn() {
    alert(this.state.inputText)
  }

  render() {
    return (
      <View style={textInputStyles.container}>
        <View style={textInputStyles.flex}>
          <TextInput style={textInputStyles.input} returnKeyType="search" placeholder="please input content"
                     onChangeText={this.getContent.bind(this)}/>
        </View>
        <TouchableOpacity style={textInputStyles.btn} onPress={this.clickBtn.bind(this)}>
          <Text style={textInputStyles.search}>Search</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const textInputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 45,
    marginTop: 25
  },
  flex: {
    flex: 1
  },
  input: {
    height: 45,
    borderWidth: 1,
    marginLeft: 5,
    paddingLeft: 5,
    borderColor: '#CCC',
    borderRadius: 4
  },
  btn: {
    width: 55,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#23BEFF',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: 'bold'
  }
});

class LessonImage extends Component<{}> {
  render() {
    return (
      <View style={imageStyles.container}>
        <View style={imageStyles.net}>
          <Image source={{url: 'https://www.doone.com.cn/u/cms/www/201609/09115701d2rl.png', method: 'GET'}}
                 style={imageStyles.netImage}></Image>
        </View>
        <View style={imageStyles.local}>
          <Image style={imageStyles.localImage} source={require('./resources/rn.png')}></Image>
        </View>
      </View>
    )
  }
}

const imageStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 28,
    alignItems: 'center'
  },
  net: {
    marginTop: 10,
    width: 300,
    height: 200,
    justifyContent: 'center',
    backgroundColor: 'cyan'
  },
  netImage: {
    width: 280,
    height: 120,
    backgroundColor: 'gray'
  },
  local: {
    marginTop: 10,
    width: 300,
    height: 200,
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
  localImage: {
    width: 260,
    height: 180,
    backgroundColor: 'gray'
  }
})

import movieData from './resources/MoviesExample.json'

const movies = movieData.movies;

class MyFlatList extends Component<{}> {
  _renderItem({item}) {
    return (
      <Text style={MyFlatListStyles.item} key={item.id}>{item.title}</Text>
    )
  }
  render() {
    return (
      <View style={MyFlatListStyles.container}>
        <FlatList
          data={movies}
          renderItem={this._renderItem.bind(this)}
        />
      </View>

    )
  }
}

const MyFlatListStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})


// 实现ScrollView的基本功能
// 电影列表
// import MyScrollView from './components/myScrollView'
// import MovieList from './components/movieList'
// import MyListView from './components/myListView'
// import ReactNavigationComponent from './components/navagationComponent'
// import TabNavigationComponent from './components/tabNavigationComponent'
import DrawerNavigationComponent from './components/drawerNavigationComponent'

// import FetchComponent from './components/fetchComponent'
import FadeInView from './components/FadeInView'

export default class LessonAnimated extends Component<{}> {
  render() {
    return (
      <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
      </FadeInView>
    )
  }
}


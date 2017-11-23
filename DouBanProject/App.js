/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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
  FlatList,
  StatusBar,
  TabBarIOS
} from 'react-native';

import {
  StackNavigator
} from 'react-navigation'

import BookList from './android_views/book/book_list'
import MovieList from './android_views/movie/movie_list'
import BookDetail from "./android_views/book/book_detail"
import MobileWebView from './android_views/common/customWebview'

StatusBar.setHidden(true);

const NavigationApp = StackNavigator(
  {
    Movie: {
      screen: MovieList,
      navigationOptions: {
        // title: 'Movie List', // 不推荐使用
        headerTitle: 'Movie List Header', // headerTitle：设置导航栏标题，推荐用这个方法。
        headerStyle: {
          height: 30,
          backgroundColor: 'rgb(233,233,239)',
        },
        headerTitleStyle: {
          alignSelf: 'center'
        },
        headerTintColor: '#FFF', // 设置导航栏文字颜色
        headerBackTitleStyle: 'Comic Sans MS'//设置导航条返回文字样式。
      }
    },
    Book: {
      screen: BookList,
      navigationOptions: {
        headerTitle: 'Book List Header',
        headerStyle: {
          backgroundColor: '#03A9BE',
        },
      }
    },
    BookDetail: {
      screen: BookDetail,
      navigationOptions: {
        title: 'Book Detail',
        header: null
      }
    },

    MovieDetail: {
      screen: MobileWebView,
      navigationOptions: {
        header: null
      }
    }

  })

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      selectorTab: '图书'
    }
  }
  render() {
    return (
        <NavigationApp/>
    );
  }
}

const styles = StyleSheet.create({
});


// {/*<View style={styles.container}>*/}
// {/*<TabBarIOS>*/}
// {/*<TabBarIOS.Item title="图书" selected={this.state.selectorTab==='图书'}*/}
// {/*onPress={()=>this.setState({selectorTab: "图书"})}*/}
// {/*>*/}
// {/*<View style={{backgroundColor: 'cyan'}}></View>*/}
// {/*</TabBarIOS.Item>*/}
// {/*<TabBarIOS.Item title="电影" selected={this.state.selectorTab==='电影'}*/}
// {/*onPress={()=>this.setState({selectorTab: "电影"})}*/}
// {/*>*/}
// {/*<View style={{backgroundColor: 'dodgerblue'}}></View>*/}
// {/*</TabBarIOS.Item>*/}
// {/*</TabBarIOS>*/}
// // </View>
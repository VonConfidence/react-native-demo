/*
  实现功能: 封装导航初始化设置

  包含组件 React-Navigation

  外部传入:
    component: 需要展示的页面组件
    route对象: 必须添加component属性; 如果需要传值可以添加passProps属性
 */
import {
  StackNavigator,
} from 'react-navigation';

import BookList from './../book/book_list'
import MovieList from './../movie/movie_list'


const NavigationApp = StackNavigator(
  {
    Main: {screen: BookList},
    Book: {screen: BookList},
    Movie: {screen: MovieList}
  })

export default NavigationApp
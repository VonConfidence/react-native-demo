import React, {Component} from 'react'

import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native'

// 数据源的网址: https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json

// 从文件中读取数据
import movieData from '../resources/MoviesExample.json'

const movies = movieData.movies;

export default class MovieList extends Component<{}> {
  render() {
    // 处理数据 创建电影列表组件, 根据movies数组中元素的数据个数 创建组件
    var moviesRows = [];

    for (var i in movies) {
      // 获取movie对象
      var movie = movies[i];
      var row = (
        <View key={i} style={styles.row}>
          <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail}/>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
          </View>
        </View>
      )
      moviesRows.push(row)
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {
            // 添加的是一个数组 (所有的子组件)
            moviesRows
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  scrollView: {
    flex:1,
    marginTop: 20,
    backgroundColor: '#F5FCFF'
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  thumbnail: {
    width: 53,
    height: 81,
    backgroundColor: 'gray'
  },
  rightContainer: {
    marginLeft: 10,
    flex: 1
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    marginBottom: 3,
    textAlign: 'center'
  },
  year: {
    marginBottom: 3,
    textAlign: 'center'
  }
})
import React, {Component} from 'react'

import {
  View,
  Text,
  ListView,
  Image,
  StyleSheet
} from 'react-native'

// 数据源的网址: https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json

// 从文件中读取数据
import movieData from '../resources/MoviesExample.json'
import MovieList from "./movieList";

const movies = movieData.movies;

/**
 * ListView 数据列表
 *  最重要的是设置每行显示的组件
 *    section header
 *
 *  使用ListView.DataSource 传递一个数据数组 再使用datasource对象实例化一个ListView组件
 *
 *  ListView实现 row/section组件定义 设置数据
 *
 *  设置ListView数据源
 *  将DataSource对象设置为state属性
 */
export default class MyListView extends Component<{}> {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (oldRow, newRow) => oldRow !== newRow // 通过判断决定渲染哪些行组件 避免全部渲染
    });
    this.state = {
      // 设置DataSource 不直接使用提供的原始数据, 使用cloneWithRows对数据源进行复制
      dataSource: ds.cloneWithRows(movies)
    }
  }

  // 渲染row组件, 参数是每行要显示的数据对象
  _renderRow(movie) {
    return (
      <View style={styles.row}>
        <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    )
  }

  // 渲染头部
  _renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.header_text}>MovieList</Text>
        <View style={styles.header_line}></View>
      </View>
    )
  }

  // 渲染分割线
  _renderSeparator(sectionId, rowId) {
    return (
      <View style={styles.separator} key={sectionId+rowId}></View>
    )
  }

  render() {
    return (
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderHeader={this._renderHeader.bind(this)}
        renderSeparator={this._renderSeparator.bind(this)}
        initialListSize={10}
      />
    )
  }
}

const styles = StyleSheet.create({
  listView: {
    marginTop: 25,
    flex:1,
    backgroundColor: '#F5FCFF'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    backgroundColor: '#F5FCFF'
  },
  thumbnail: {
    width: 53,
    height: 80,
    backgroundColor: 'gray'
  },
  rightContainer: {
    marginLeft: 5,
    flex :1
  },
  title: {
    fontSize: 12,
    marginTop: 3,
    marginBottom: 3,
    textAlign: 'center'
  },
  year: {
    marginBottom: 3,
    textAlign: 'center'
  },

  // header组件的样式
  header: {
    height : 44,
    backgroundColor: '#F5FCFF'
  },
  header_text: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 44
  },
  header_line: {
    height: 1,
    backgroundColor: '#aaaaaa'
  },
  //分割线的样式
  separator: {
    height: 1,
    backgroundColor: '#aaaaaa'
  }
})
/*
  外部传入:

  movie   电影对象
  onPress  通过...this.props绑定 需要设置参数: 电影名称, 电影详情页面url

  需要使用的字段:
    images.medium 电影图像
    title         电影名称
    casts         电影演员 数据需要在处理
    rating.average 电影评分
    year           电影上映时间
    genres         电影标签
    alt            电影详情url
 */

import React, {Component} from 'react'

import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default class MovieItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // https://api.douban.com/v2/movie/search?q=%E5%88%98%E4%BA%A6%E8%8F%B2
    var movie = this.props.movie;
    // 提取演员姓名 - 原始数据结构数组元素是描述演员对象, 对象中包含演员名字 需要遍历演员数组存在一个新的数组中
    var actors = movie.casts.map(item => item.name);
    return (
      <TouchableOpacity style={styles.item} {...this.props}>
        <View style={styles.imageContainer}>
          <Image source={{uri: movie.images.medium}} style={styles.image} resizeMode="contain"/>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1}>名称: {movie.title}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1}>演员: {actors}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1}>评分: {movie.rating.average}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1}>时间: {movie.year}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1}>标签: {movie.genres}</Text>
          </View>

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    height: 120,
    padding: 10
  },
  imageContainer: {
    justifyContent:'center',
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 110
  },
  contentContainer: {
    flex: 1,
    marginLeft: 15
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'black'
  }
})


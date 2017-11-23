import React, {Component} from 'react'

import {
  StyleSheet,
  Text,
  View
} from 'react-native'

// 组件 导出
export default class News extends Component<{}> {
  show(title) {
   alert(title)
  }
  render() {
    // 定义数组, 用于存储设置好的Text组件
    var newsComponents = [];
    // 遍历存储信息的数组, 从外部传入
    var newsArray = this.props.newsArray;
    for (var index in newsArray) {
      var text = (
        <Text numerOfLines={2} key={index} style={newsStyles.news_item} onPress={this.show.bind(this, newsArray[index])}>{newsArray[index]}</Text>
      )
      // 将设置好的text组件存储到数组当中
      newsComponents.push(text);
    }
    return (
      <View style={newsStyles.flex}>
        <Text style={newsStyles.news_title}>今日要闻</Text>
        {newsComponents}
      </View>
    )
  }
}

// 样式
const newsStyles = StyleSheet.create({
  flex: {
    flex: 1
  },
  // 今日要闻新闻标题
  news_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CD1D1C',
    marginLeft: 10,
    marginTop:15
  },
  // 每条新闻
  news_item: {
    fontSize: 12,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 30
  }
})

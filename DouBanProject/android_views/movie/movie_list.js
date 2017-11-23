import React, {Component} from 'react'

import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';

import Util from './../common/util'
import SearchBar from './../common/searchBar'
import ServiceURL from './../common/service'


import MovieItem from './../movie/movie_item'

export default class MovieList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      show:false,
      keywords: '胡歌'
    }
  }

  // TextInput的onChangeText事件的处理方法
  _changeText(keywords) {
    this.setState({keywords})
  }
  _searchPress() {
    this._getData();
  }

  _getData() {
    // https://api.douban.com/v2/movie/search?q=%E5%88%98%E4%BA%A6%E8%8F%B2
    // 开启loading
    this.setState({show:false});
    // 请求数据

    var _this = this;

    var url = ServiceURL.movie_search + '?count=20&q=' + encodeURIComponent(_this.state.keywords)
    Util.getRequest(url, (data)=> {
      // 请求成功的回调函数
      if (!data.subjects || data.subjects.length == 0) {
        return alert('未查询到相关电影')
      }
      // 设置下载状态和数据源
      _this.setState({dataSource: data.subjects, show:true})
      console.log(data.subjects)
    }, (error)=> {
      // 请求失败的回调函数
      alert('网络请求错误: ' + error.message)
    })
  }
  componentDidMount() {
    this._getData()
  }
  _renderItem({item}) {
    var url = item.alt;
    var title = item.title;
    var backName = '电影'
    return (<MovieItem
      movie={item}
      onPress={()=> this.props.navigation.navigate('MovieDetail', {title, url, backName})}
    />)
  }
  _renderSeparator({item, index}) {
    var style = {
      height: 1,
      backgroundColor: '#CCCCCC'
    }

    return <View style={style} key={item + index}></View>
  }
  _keyExtractor(item, index) {
    return item.id;
  }
  render() {
    return (
      <ScrollView>
        <SearchBar
          placeholder="请输入电影的名称"
          onPress={this._searchPress.bind(this)}
          onChangeText={this._changeText.bind(this)}
          onSubmitEditing={this._searchPress.bind(this)}
          secureTextEntry={false}
        />
        {
          this.state.show ?
            <FlatList
              data={this.state.dataSource}
              initialNumToRender={10}
              renderItem={this._renderItem.bind(this)}
              keyExtractor={this._keyExtractor}
              ItemSeparatorComponent={this._renderSeparator.bind(this)}
            />
            :
            Util.loading
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

})
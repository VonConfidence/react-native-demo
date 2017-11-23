import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl
} from 'react-native'

/**
 * 实现检测拖拽, 滑动的相关方法
 */
export default class MyScrollView extends Component<{}> {
  _onScrollBeginDrag() {
    console.log('拖拽开始')
  }

  _onScrollEndDrag() {
    console.log('结束拖拽')
  }

  _onMonmentumScrollBegin() {
    console.log('开始滑动')
  }

  _onMomentumScrollEnd() {
    console.log('滑动结束')
  }

  _onRefresh() {
    // console.log('刷新')
    alert('刷新')
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}
                    showVerticalScrollIndicator={true}
                    onScrollBeginDrag={this._onScrollBeginDrag.bind(this)}
                    onScrollEndDrag={this._onScrollEndDrag.bind(this)}
                    onMonmentumScrollBegin={this._onMonmentumScrollBegin.bind(this)}
                    onMonmentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
                    refreshControl={
                      <RefreshControl refreshing={false}
                                      tintColor='red'
                                      title="正在加载..."
                                      onRefresh={this._onRefresh.bind(this)}
                      />}
        >
          <View style={styles.view_1}></View>
          <View style={styles.view_2}></View>
          <View style={styles.view_3}></View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    marginTop: 20,
    backgroundColor: '#CCC'
  },
  view_1: {
    margin: 5,
    flex: 1,
    height: 300,
    backgroundColor: 'yellow'
  },
  view_2: {
    margin: 5,
    flex: 1,
    height: 300,
    backgroundColor: 'blue'
  },
  view_3: {
    margin: 5,
    flex: 1,
    height: 300,
    backgroundColor: 'cyan'
  }
})
import React, {Component} from 'react'
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  TextInput
} from 'react-native'

import NavigationBar from './NavigationBar'
import Toast, {DURATION} from 'react-native-easy-toast'

const KEY = 'text'

export default class AsyncPageTest extends Component {
  constructor(props) {
    super(props)
  }
  onSave() {
    AsyncStorage.setItem(KEY, this.text, (error)=> {
      if (!error) {
        this.toast.show('save success', DURATION.LENGTH_LONG)
      } else {
        this.toast.show('save failed', DURATION.LENGTH_LONG)
      }
    })
  }
  onFetch() {
    AsyncStorage.getItem(KEY, (error, result)=> {
      if (!error) {
        if (result != null && result != '') {
            this.toast.show('取出数据为' + result, DURATION.LENGTH_LONG)
        } else {
            this.toast.show('key 值不存在', DURATION.LENGTH_LONG)
        }

      } else {
        this.toast.show('fetch failed', DURATION.LENGTH_LONG)
      }
    })
  }
  onRemove() {
    AsyncStorage.removeItem(KEY, error=> {
      if (!error) {
        this.toast.show('remove success', DURATION.LENGTH_LONG)
      } else {
        this.toast.show('remove failed', DURATION.LENGTH_LONG)
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="AsyncStorageTest"
          style={{backgroundColor:'#2196F3'}}
          statusBar={{backgroundColor:'#2196F3'}}
        />
        <TextInput
          style={{borderWidth:1, height: 40, margin: 6}}
          onChangeText={text=> this.text=text}
        />
        <View style={{flexDirection: 'row'}}>
          <Text
            style={styles.tips}
            onPress={()=> this.onSave()}
            >保存</Text>
          <Text
            style={styles.tips}
            onPress={()=> this.onFetch()}
            >获取</Text>
          <Text
            style={styles.tips}
            onPress={()=> this.onRemove()}
            >保存</Text>
        </View>
        <Toast ref={toast=> this.toast = toast}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    flex: 1,
    margin: 5,
    borderWidth: 1
  }
})

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput
} from 'react-native';

// StatusBar.setHidden(true);

import NavigationBar from './NavigationBar'

import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'


const URL = 'https://github.com/trending/'

export default class App extends Component<> {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending)
    this.state = {
      result:''
    }
  }
  onLoad() {
    let url = URL + this.text;
    this.dataRepository.fetchRepository(url).then(result=> {
      alert(url)
      this.setState({result: JSON.stringify(result)})
    }).catch(error=> {
      this.setState({result: JSON.stringify(error)})
    })
  }
  render() {
    return (
      <View style={styles.container}>
        {/*顶部导航栏*/}
        <NavigationBar
          title={'TrendingTest'}
          style={{backgroundColor:'rgb(277,104,81)'}}
          statusBar={{backgroundColor: 'rgb(277,104,81)'}}
        />
        <TextInput style={{height: 30, borderWidth:1}} onChangeText={text=> this.text = text}/>
        <View style={{flexDirection: 'row'}}>
          <Text onPress={()=> this.onLoad()}>加载</Text>
          <Text style={{backgroundColor: 'dodgerblue', flex: 1}}>{this.state.result}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import NavigationBar from './NavigationBar'

export default class App extends Component<> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <NavigationBar
            title={'Boy'}
            style={{backgroundColor:'rgb(30,103,175)'}}
            statusBar={{backgroundColor:'rgb(234,32,0)'}}
        />
        <TouchableOpacity style={{borderWidth:1, backgroundColor:'blue', flexDirection: 'row', justifyContent:'center', width: 150}}
            onPress={() => navigation.navigate('Girl', {name: 'im wind'})}
            >
            <Text style={{color:'white'}}>NavigateToGirl</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
});

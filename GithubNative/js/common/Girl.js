import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native';

// StatusBar.setHidden(true);

import NavigationBar from './NavigationBar'

export default class App extends Component<> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  renderButton(image) {
    // onPress={()=>this.props.navigation.goBack()}
    const {goBack} = this.props.navigation;
    return (
      <TouchableOpacity onPress={()=> goBack()}>
        <Image source={image} style={{width: 22, height: 22, margin: 5}}/>
      </TouchableOpacity>
    )
  }
  render() {
    const {state} = this.props.navigation;
    return (
      <View style={styles.container}>
        {/*顶部导航栏*/}
        <NavigationBar
          title={'Girl'}
          style={{backgroundColor:'rgb(277,104,81)'}}
          statusBar={{backgroundColor: 'rgb(277,104,81)'}}
          leftButton={
            this.renderButton(require('../../res/images/ic_arrow_back_white_36pt.png'))
          }
          rightButton={
            this.renderButton(require('../../res/images/ic_star.png'))
          }
        />
        <Text>{state.params.name}</Text>
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

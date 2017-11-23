import React, {Component} from 'react'

import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native'

import {
  StackNavigator,
} from 'react-navigation';

class MainScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to My's profile" style={{backgroundColor: 'red', width: 40, height: 20}}
        onPress={() =>
          navigate('Profile', { name: 'Jane' })
        }
      />
    );
  }
}

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = {
    title: 'My Profile',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button style={{backgroundColor: 'blue', width: 40, height: 20}}
        title="Go to MainPage"
        onPress={() =>
          navigate('Main', { name: 'profile give you' })
        }
      />
    );
  }
}

const NavigationApp = StackNavigator({
  Main: {screen: MainScreen},
  Profile: {screen: ProfileScreen},
});

export default class NavigationComponent extends Component<{}> {
  render() {
    return (
      <View style={{backgroundColor: 'yellow', flex: 1, flexDirection: 'row'}}>
        <NavigationApp/>
      </View>
    )
  }
}
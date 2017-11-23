import React, {Component} from 'react'

import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native'

import {
  DrawerNavigator
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
    <Button onPress={()=> navigation.navigate('DrawerToggle')} title="Go To Profile"/>
  </View>
);

const ProfileScreen = ({navigation}) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
    <Button name="facebook" title="Go to Home" onPress={()=> navigation.navigate('DrawerToggle')}>
    </Button>
  </View>
);

const RootDrawerNavigation = DrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
});

export default RootDrawerNavigation;
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProfileStack from './ProfileScreens/ProfileStack'
import QrStack from './QrScreens/QrStack'
import Icon from 'react-native-vector-icons/Ionicons'

export default createBottomTabNavigator({
  Qr: {
    screen: QrStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='md-qr-scanner' color={tintColor} size={24} />
      )

    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='md-person' color={tintColor} size={24} />
      )
    }
  }
}, {
  initialRouteName: 'Qr',
  order: ['Qr', 'Profile'],
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions: {
    showLabel:false,
    activeTintColor: "blue",
    inactiveTintColor: "gray"
  }
});
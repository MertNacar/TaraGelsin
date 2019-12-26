import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProfileStack from './ProfileScreens/ProfileStack'
import QrScreen from './QrScreens/QrScreen'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default createBottomTabNavigator({
  Qr: {
    screen: QrScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='home' color={tintColor} size={24} />
      )

    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='user' color={tintColor} size={24} />
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
    activeTintColor: "blue",
    inactiveTintColor: "gray"
  }
});
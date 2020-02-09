import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProfileStack from './Profile/ProfileStack'
import QrStack from './Qr/QrStack'
import Icon from 'react-native-vector-icons/Ionicons'

const MainNavigator = createBottomTabNavigator({
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
    showLabel: false,
    activeTintColor: "blue",
    inactiveTintColor: "gray"
  }
});

QrStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default MainNavigator
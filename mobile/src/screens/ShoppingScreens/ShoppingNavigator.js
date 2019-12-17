import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CafeScreen from './CafeScreen/CafeScreen'
import CartStack from './CartScreens/CartStack'
import MenuStack from './MenuScreens/MenuStack'
import WaiterScreen from './WaiterScreens/WaiterScreen'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default createBottomTabNavigator({
  Menu: {
    screen: MenuStack, navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='home' color={tintColor} size={24} />
      )

    }
  },
  Cafe: {
    screen: CafeScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='user' color={tintColor} size={24} />
      )
    }
  },
  Waiter: {
    screen: WaiterScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='user' color={tintColor} size={24} />
      )
    }
  }
  ,
  Cart: {
    screen: CartStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='user' color={tintColor} size={24} />
      )
    }
  }
}, {
  initialRouteName: 'Menu',
  order: ['Menu', 'Cafe', "Waiter", "Profile"],
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions: {
    activeTintColor: "blue",
    inactiveTintColor: "gray"
  }
});
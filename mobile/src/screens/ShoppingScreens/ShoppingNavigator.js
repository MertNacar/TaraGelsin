import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CafeScreen from './CafeScreen/CafeScreen'
import CartStack from './CartScreens/CartStack'
import MenuStack from './MenuScreens/MenuStack'
import WaiterScreen from './WaiterScreens/WaiterScreen'
import Icon from 'react-native-vector-icons/Ionicons'

export default createBottomTabNavigator({
  Menu: {
    screen: MenuStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='md-book' color={tintColor} size={30} />
      )

    }
  },
  Cafe: {
    screen: CafeScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='md-home' color={tintColor} size={30} />
      )
    }
  },
  Waiter: {
    screen: WaiterScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='md-notifications' color={tintColor} size={30} />
      )
    }
  }
  ,
  Cart: {
    screen: CartStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='md-cart' color={tintColor} size={30} />
      )
    }
  }
}, {
  initialRouteName: 'Menu',
  order: ['Menu', 'Cafe', "Waiter", "Cart"],
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions: {
    showLabel: false,
    activeTintColor: "blue",
    inactiveTintColor: "gray"
  }
});
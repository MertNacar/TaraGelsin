import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import CartScreen from './CartScreen/CartScreen'
import PaymentScreen from './PaymentScreens/PaymentScreen'
import * as Colors from '../../../constStyle/colors'
import Icon from 'react-native-vector-icons/Ionicons'

export default createStackNavigator({
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      headerTitle: "Sepetim",
      headerTitleStyle: {
        flex: 1,
        color: Colors.COLOR_SECONDARY,
        textAlign: "center",
        marginLeft: 72
      },
      headerRight: (<Icon name="md-settings" size={26} color={Colors.COLOR_PRIMARY} style={{ paddingHorizontal: 15 }} />),
      headerStyle: {
        backgroundColor: Colors.COLOR_BACKGROUND,
      },
    }
  },
  Payment: {
    screen: PaymentScreen,
    navigationOptions: {
      headerTitle: "Ödeme",
      headerTitleStyle: {
        flex: 1,
        color: Colors.COLOR_SECONDARY,
        textAlign: "center",
        marginLeft: 16
      },
      headerRight: (<Icon name="md-settings" size={26} color={Colors.COLOR_PRIMARY} style={{ paddingHorizontal: 15 }} />),
      headerStyle: {
        backgroundColor: Colors.COLOR_BACKGROUND,
      },
    }
  },
},
  {
    initialRouteName: "Cart"
  });
import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import CartScreen from './CartScreen/CartScreen'
import PaymentScreen from './PaymentScreens/PaymentScreen'
import * as Colors from '../../../constStyle/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import TabBarLogout from '../../../components/TabBarLogout'

export default createStackNavigator({
  Cart: {
    screen: CartScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Sepetim",
      headerTitleStyle: {
        flex: 1,
        color: Colors.COLOR_SECONDARY,
        textAlign: "center",
        marginLeft: 72
      },
      headerRight: (
        <TabBarLogout {...navigation} />
      ),
      headerStyle: {
        backgroundColor: Colors.COLOR_BACKGROUND,
      },
    })
  },
  Payment: {
    screen: PaymentScreen,
    navigationOptions: {
      headerTitle: "Ödeme",
      headerLeftContainerStyle: {
        backgroundColor: Colors.COLOR_SECONDARY
      },
      headerTitleStyle: {
        flex: 1,
        color: Colors.COLOR_SECONDARY,
        textAlign: "center",
        marginRight: 56
      },
      headerStyle: {
        backgroundColor: Colors.COLOR_BACKGROUND,
      },
    }
  },
},
  {
    initialRouteName: "Cart"
  });
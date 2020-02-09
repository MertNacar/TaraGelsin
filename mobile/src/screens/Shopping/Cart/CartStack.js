import { createStackNavigator } from 'react-navigation-stack'
import CartScreen from './CartScreen/CartScreen'
import PaymentScreen from './PaymentScreens/PaymentScreen'
import ChoosePaymentScreen from './ChoosePaymentScreen/ChoosePaymentScreen'
import * as Colors from '../../../constStyle/colors'

export default createStackNavigator({
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      headerTitle: "Sepetim",
      headerTitleStyle: {
        flex: 1,
        color: Colors.COLOR_SECONDARY,
        textAlign: "center"
      },
      headerStyle: {
        backgroundColor: Colors.COLOR_BACKGROUND,
      },
    }
  },
  ChoosePayment: {
    screen: ChoosePaymentScreen,
    navigationOptions: {
      headerTitle: "Ödeme Yöntemi Seç",
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
  Payment: {
    screen: PaymentScreen,
    navigationOptions: {
      headerTitle: "Ödeme",
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
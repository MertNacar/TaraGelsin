import { createStackNavigator } from 'react-navigation-stack'
import CartScreen from './CartScreen/CartScreen'
import PaymentScreen from './PaymentScreens/PaymentScreen'
import ChoosePaymentScreen from './ChoosePaymentScreen/ChoosePaymentScreen'

export default createStackNavigator({
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      header: null
    }
  },
  ChoosePayment: ChoosePaymentScreen,
  Payment: PaymentScreen,
});
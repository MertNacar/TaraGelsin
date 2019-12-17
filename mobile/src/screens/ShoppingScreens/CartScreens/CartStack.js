import { createStackNavigator } from 'react-navigation-stack'
import CartScreen from './CartScreen/CartScreen'
import PaymentScreen from './PaymentScreens/PaymentScreen'
import ChoosePaymentScreen from './ChoosePaymentScreen/ChoosePaymentScreen'

export default createStackNavigator({
  Cart: CartScreen,
  ChoosePayment: ChoosePaymentScreen,
  Payment: PaymentScreen,
});
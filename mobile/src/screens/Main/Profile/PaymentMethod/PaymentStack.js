import { createStackNavigator } from 'react-navigation-stack'
import PaymentMethodScreen from './PaymentMethod/PaymentMethodScreen'
import AddPaymentScreen from './AddPaymentMethod/AddPaymentScreen'
import * as Colors from '../../../../constStyle/colors'

export default createStackNavigator({
  PaymentMethod: {
    screen: PaymentMethodScreen,
    navigationOptions: {
      headerTitle: "Payment Methods",
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
  AddPaymentMethod: {
    screen: AddPaymentScreen,
    navigationOptions: {
      headerTitle: "Add Payment Method",
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
  }
},
  {
    initialRouteName: "PaymentMethod"
  });
import { createStackNavigator } from 'react-navigation-stack'
import NewPassScreen from './NewPass/NewPassScreen'
import VerifyPhoneScreen from './VerifyPhone/VerifyPhoneScreen'
import * as Colors from '../../../../constStyle/colors'

export default createStackNavigator({
  NewPass: {
    screen: NewPassScreen,
    navigationOptions: {
      header: null
    }
  },
  VerifyPhone: {
    screen: VerifyPhoneScreen,
    navigationOptions: {
      headerTitle: "Verify Phone",
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
    initialRouteName: "NewPass"
  });
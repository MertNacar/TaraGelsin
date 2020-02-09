import { createStackNavigator } from 'react-navigation-stack'
import ForgetPasswordScreen from './ForgetPassword/ForgetPasswordScreen'
import ForgetPasswordScreen2 from './ForgetPassword2/ForgetPasswordScreen2'
import * as Colors from '../../../constStyle/colors'

export default createStackNavigator({
  Forget: {
    screen: ForgetPasswordScreen,
    navigationOptions: {
      headerTitle: "Forget Password",
      headerLeftContainerStyle: {
        backgroundColor: Colors.COLOR_SECONDARY
      },
      headerTitleStyle: {
        flex: 1,
        color: Colors.COLOR_SECONDARY,
        textAlign: "center",
      },
      headerStyle: {
        backgroundColor: Colors.COLOR_BACKGROUND,
      },
    }
  },
  Forget2: {
    screen: ForgetPasswordScreen2,
    navigationOptions: {
      headerTitle: "Forget Password",
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
    initialRouteName: "Forget"
  });
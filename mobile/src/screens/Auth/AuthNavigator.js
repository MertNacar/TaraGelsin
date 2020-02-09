import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './Login/LoginScreen'
import SignupStack from './Signup/SignupStack'
import ForgetStack from './ForgetPassword/ForgetStack'
import * as Colors from '../../constStyle/colors'

export default createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: "Login",
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
  Signup: {
    screen: SignupStack,
    navigationOptions: {
      header: null
    }
  },
  Forget: {
    screen: ForgetStack,
    navigationOptions: {
      header: null
    }
  },
},
  {
    initialRouteName: "Login"
  }
);
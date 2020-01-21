import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './LoginScreens/LoginScreen'
import SignupStack from './SignupScreens/SignupStack'
import ForgetStack from './ForgetPasswordScreens/ForgetStack'
//login hariç stackler gelcek
export default createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
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
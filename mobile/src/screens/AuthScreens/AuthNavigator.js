import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './LoginScreens/LoginScreen'
import SignupStack from './SignupScreens/SignupStack'
import ForgetPasswordScreen from './ForgetPasswordScreens/ForgetPasswordScreen'
//login hariç stackler gelcek
export default createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  Signup: SignupStack,
  Forget: ForgetPasswordScreen
},
  {
    initialRouteName: "Login"
  }
);
import { createSwitchNavigator } from 'react-navigation'
import LoginScreen from './LoginScreens/LoginScreen'
import SignupStack from './SignupScreens/SignupStack'
import ForgetStack from './ForgetPasswordScreens/ForgetStack'
//login hariç stackler gelcek
export default createSwitchNavigator({
  Login: LoginScreen,
  Signup: SignupStack,
  Forget: ForgetStack,
},
  {
    initialRouteName: "Login"
  }
);
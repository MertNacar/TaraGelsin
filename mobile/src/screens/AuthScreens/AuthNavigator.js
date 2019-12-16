import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './LoginScreens/LoginScreen'
import SignupScreen from './SignupScreens/SignupScreen'
import ForgetPasswordScreen from './ForgetPasswordScreens/ForgetPasswordScreen'
//login hariç stackler gelcek
export default createStackNavigator({
    Login: LoginScreen,
    Signup: SignupScreen,
    Forget: ForgetPasswordScreen
});
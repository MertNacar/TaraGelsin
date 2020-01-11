import { createStackNavigator } from 'react-navigation-stack'
import ForgetPasswordScreen from './ForgetPasswordScreen'
import ForgetPasswordScreen2 from './ForgetPasswordScreen2'

export default createStackNavigator({
  Forget: {
    screen: ForgetPasswordScreen,
    navigationOptions: {
      header: null
    }
  },
  Forget2: ForgetPasswordScreen2,
},
  {
    initialRouteName: "Forget"
  });
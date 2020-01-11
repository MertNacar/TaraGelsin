import { createStackNavigator } from 'react-navigation-stack'
import SignupScreen from './SignupScreen'
import SignupScreen2 from './SignupScreen2'
import SignupScreen3 from './SignupScreen3'

export default createStackNavigator({
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      header: null
    }
  },
  Signup2: SignupScreen2,
  Signup3: SignupScreen3,
},
{
  initialRouteName: "Signup"
});
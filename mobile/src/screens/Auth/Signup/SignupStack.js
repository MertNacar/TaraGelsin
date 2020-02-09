import { createStackNavigator } from 'react-navigation-stack'
import SignupScreen from './Signup/SignupScreen'
import SignupScreen2 from './Signup2/SignupScreen2'
import SignupScreen3 from './Signup3/SignupScreen3'
import * as Colors from '../../../constStyle/colors'

export default createStackNavigator({
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      headerTitle: "Signup",
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
  Signup2: {
    screen: SignupScreen2,
    navigationOptions: {
      headerTitle: "Signup",
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
  Signup3: {
    screen: SignupScreen3,
    navigationOptions: {
      headerTitle: "Signup",
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
    initialRouteName: "Signup"
  });
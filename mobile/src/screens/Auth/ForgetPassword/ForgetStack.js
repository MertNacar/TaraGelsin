import { createStackNavigator } from 'react-navigation-stack'
import ForgetPasswordScreen from './ForgetPassword/ForgetPasswordScreen'
import ForgetPasswordScreen2 from './ForgetPassword2/ForgetPasswordScreen2'
import ForgetPasswordScreen3 from './ForgetPassword3/ForgetPasswordScreen3'
import SignupScreen3 from '../Signup/Signup3/SignupScreen3'
import * as Colors from '../../../constStyle/colors'

export default createStackNavigator({
  Forget: {
    screen: ForgetPasswordScreen,
    navigationOptions: {
      headerTitle: "Şifremi Unuttum",
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
      headerTitle: "Telefonumu Onayla",
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
  Forget3: {
    screen: ForgetPasswordScreen3,
    navigationOptions: {
      headerTitle: "Şifremi Değiştir",
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
  Forget4: {
    screen: SignupScreen3,
    navigationOptions: {
      headerTitle: "Şifremi Unuttum",
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
    initialRouteName: "Forget"
  });
import { createStackNavigator } from 'react-navigation-stack'
import QrScreen from './Qr/QrScreen'
import ScanScreen from './Scan/ScanScreen'
import * as Colors from '../../../constStyle/colors'

export default createStackNavigator({
  Qr: {
    screen: QrScreen,
    navigationOptions: {
      headerTitle: "Qr Screen",
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
  Scan: {
    screen: ScanScreen,
    navigationOptions: {
      headerTitle: "Scan Qr Code",
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
    initialRouteName: "Qr"
  });
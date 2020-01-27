import { createStackNavigator } from 'react-navigation-stack'
import QrScreen from './QrScreen/QrScreen'
import ScanScreen from './ScanScreen/ScanScreen'
//login hariç stackler gelcek
export default createStackNavigator({
  Qr: {
    screen: QrScreen,
    navigationOptions: {
      header: null
    }
  },
  Scan: {
    screen: ScanScreen,
  }
},
  {
    initialRouteName: "Qr"
  });
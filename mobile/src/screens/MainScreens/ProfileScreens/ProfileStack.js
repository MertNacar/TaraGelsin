import { createStackNavigator } from 'react-navigation-stack'
import ProfileScreen from './ProfileScreen/ProfileScreen'
import ProfileUpdateScreen from './ProfileUpdateScreen/ProfileUpdateScreen'
import CredCardScreen from './CredCardScreen/CredCardScreen'
import AddCredCardScreen from './CredCardScreen/AddCredCardScreen/AddCredCardScreen'
//login hariç stackler gelcek
export default createStackNavigator({
  Profile: ProfileScreen,
  UpdateProfile: ProfileUpdateScreen,
  CredCard: CredCardScreen,
  AddCredCard: AddCredCardScreen
},
  {
    initialRouteName: "Profile"
  });
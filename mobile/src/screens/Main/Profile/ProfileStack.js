import { createStackNavigator } from 'react-navigation-stack'
import ProfileScreen from './Profile/ProfileScreen'
import ProfileUpdateScreen from './ProfileUpdate/ProfileUpdateScreen'
import CredCardScreen from './CredCard/CredCardScreen'
import AddCredCardScreen from './CredCard/AddCredCardScreen/AddCredCardScreen'
import * as Colors from '../../../constStyle/colors'
export default createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerTitle: "Profile",
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
  UpdateProfile: {
    screen: ProfileUpdateScreen,
    navigationOptions: {
      headerTitle: "Update Profile",
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
  CredCard: {
    screen: CredCardScreen,
    navigationOptions: {
      headerTitle: "Kredi Kartlarım",
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
  AddCredCard: {
    screen: AddCredCardScreen,
    navigationOptions: {
      headerTitle: "Kredi Kartı Ekle",
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
    initialRouteName: "Profile"
  });
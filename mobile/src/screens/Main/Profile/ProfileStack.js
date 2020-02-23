import { createStackNavigator } from 'react-navigation-stack'
import ProfileScreen from './Profile/ProfileScreen'
import ProfileUpdateScreen from './ProfileUpdate/ProfileUpdateScreen'
import PaymentStack from './PaymentMethod/PaymentStack'
import ChangePassStack from './ChangePass/ChangePassStack'
import InformationScreen from './Informations/InformationScreen'
import LanguageScreen from './Languages/LanguageScreen'
import NotificationScreen from './Notifications/NotificationScreen'
import OrderHistoryScreen from './OrderHistory/OrderHistoryScreen'
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
  Payment: {
    screen: PaymentStack,
    navigationOptions: {
      header: null
    }
  },
  ChangePass: {
    screen: ChangePassStack,
    navigationOptions: {
      headerTitle: "Change Password",
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
  Informations: {
    screen: InformationScreen,
    navigationOptions: {
      headerTitle: "Informations",
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
  Languages: {
    screen: LanguageScreen,
    navigationOptions: {
      headerTitle: "Choose Language",
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
  Notifications: {
    screen: NotificationScreen,
    navigationOptions: {
      headerTitle: "Notifications",
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
  OrderHistory: {
    screen: OrderHistoryScreen,
    navigationOptions: {
      headerTitle: "Order History",
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
    initialRouteName: "Profile"
  });
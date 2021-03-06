import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import CafeScreen from './Cafe/CafeScreen'
import AddCommentScreen from './AddComment/AddCommentScreen'
import RatingScreen from './Rating/RatingScreen'
import * as Colors from '../../../constStyle/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import TabBarLogout from '../../../components/TabBarLogout'

export default createStackNavigator({
  Cafe: {
    screen: CafeScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Mekân",
      headerTitleStyle: {
        flex: 1,
        color: Colors.COLOR_SECONDARY,
        textAlign: "center",
        marginLeft: 72
      },
      headerRight: (
        <TabBarLogout {...navigation} />
      ),
      headerStyle: {
        backgroundColor: Colors.COLOR_BACKGROUND,
      },
    })
  },
  AddComment: {
    screen: AddCommentScreen,
    navigationOptions: {
      headerTitle: "Yorumlar",
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
  Rating: {
    screen: RatingScreen,
    navigationOptions: {
      headerTitle: "Değerlendirme",
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
    initialRouteName: "Cafe"
  });
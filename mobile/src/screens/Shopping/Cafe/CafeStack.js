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
      headerTitle: "Cafe",
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
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Yorumlar",
      headerTitleStyle: {
        flex: 1,
        color: Colors.COLOR_SECONDARY,
        textAlign: "center",
        marginLeft: 16 //right 56 sol ok
      },
      headerRight: (
        <TabBarLogout {...navigation} />
      ),
      headerStyle: {
        backgroundColor: Colors.COLOR_BACKGROUND,
      },
    })
  },
  Rating: {
    screen: RatingScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Değerlendirme",
      headerTitleStyle: {
        flex: 1,
        color: Colors.COLOR_SECONDARY,
        textAlign: "center",
        marginLeft: 16
      },
      headerRight: (
        <TabBarLogout {...navigation} />
      ),
      headerStyle: {
        backgroundColor: Colors.COLOR_BACKGROUND,
      },
    })
  },
},
  {
    initialRouteName: "Cafe"
  });
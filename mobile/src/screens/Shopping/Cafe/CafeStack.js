import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import CafeScreen from './Cafe/CafeScreen'
import AddCommentScreen from './AddComment/AddCommentScreen'
import RatingScreen from './Rating/RatingScreen'
import * as Colors from '../../../constStyle/colors'
import Icon from 'react-native-vector-icons/Ionicons'

export default createStackNavigator({
  Cafe: {
    screen: CafeScreen,
    navigationOptions: {
      headerTitle: "Cafe",
      headerTitleStyle: {
        flex: 1,
        color: Colors.COLOR_SECONDARY,
        textAlign: "center",
        marginLeft: 72
      },
      headerRight: (<Icon name="md-settings" size={26} color={Colors.COLOR_PRIMARY} style={{ paddingHorizontal: 15 }} />),
      headerStyle: {
        backgroundColor: Colors.COLOR_BACKGROUND,
      },
    }
  },
  AddComment: {
    screen: AddCommentScreen,
    navigationOptions: {
      headerTitle: "Yorumlar",
      headerTitleStyle: {
        flex: 1,
        color: Colors.COLOR_SECONDARY,
        textAlign: "center",
        marginLeft: 16
      },
      headerRight: (<Icon name="md-settings" size={26} color={Colors.COLOR_PRIMARY} style={{ paddingHorizontal: 15 }} />),
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
        marginLeft: 16
      },
      headerRight: (<Icon name="md-settings" size={26} color={Colors.COLOR_PRIMARY} style={{ paddingHorizontal: 15 }} />),
      headerStyle: {
        backgroundColor: Colors.COLOR_BACKGROUND,
      },
    }
  },
},
  {
    initialRouteName: "Cafe"
  });
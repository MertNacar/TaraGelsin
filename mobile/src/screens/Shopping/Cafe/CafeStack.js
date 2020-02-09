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
        textAlign: "center"
      },
      headerRight: (<Icon name="md-power" size={26} color={Colors.COLOR_PRIMARY} />),
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
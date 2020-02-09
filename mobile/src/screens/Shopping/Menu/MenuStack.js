import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import CategoryScreen from './CategoryScreen/CategoryScreen'
import FoodScreen from './FoodScreen/FoodScreen'
import FoodDetailScreen from './FoodDetailScreen/FoodDetailScreen'
import * as Colors from '../../../constStyle/colors'
import Icon from 'react-native-vector-icons/Ionicons'

export default createStackNavigator({
  Categories: {
    screen: CategoryScreen,
    navigationOptions: {
      headerTitle: "Categories",
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
  Foods: {
    screen: FoodScreen,
    navigationOptions: {
      headerTitle: "Foods",
      headerLeftContainerStyle: {
        backgroundColor: Colors.COLOR_SECONDARY
      },
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
  FoodDetails: {
    screen: FoodDetailScreen,
    navigationOptions: {
      headerTitle: "Food Details",
      headerLeftContainerStyle: {
        backgroundColor: Colors.COLOR_SECONDARY
      },
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
    initialRouteName: "Categories",
  });
import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import CategoryScreen from './CategoryScreen/CategoryScreen'
import FoodScreen from './FoodScreen/FoodScreen'
import FoodDetailScreen from './FoodDetailScreen/FoodDetailScreen'
import * as Colors from '../../../constStyle/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import TabBarLogout from '../../../components/TabBarLogout'

export default createStackNavigator({
  Categories: {
    screen: CategoryScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Kategoriler",
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
  Foods: {
    screen: FoodScreen,
    navigationOptions: {
      headerTitle: "Ürünler",
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
  FoodDetails: {
    screen: FoodDetailScreen,
    navigationOptions: {
      headerTitle: "Ürün Detayı",
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
    initialRouteName: "Categories",
  });
import { createStackNavigator } from 'react-navigation-stack'
import CategoryScreen from './CategoryScreen/CategoryScreen'
import FoodScreen from './FoodScreen/FoodScreen'
import FoodDetailScreen from './FoodDetailScreen/FoodDetailScreen'

export default createStackNavigator({
  Categories: {
    screen: CategoryScreen,
    navigationOptions: {
      header: null
    }
  },
  Foods: FoodScreen,
  FoodDetails: FoodDetailScreen,
},
  {
    initialRouteName: "Categories"
  });
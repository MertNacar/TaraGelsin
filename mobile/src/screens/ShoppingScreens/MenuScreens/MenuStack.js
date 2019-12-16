import { createStackNavigator } from 'react-navigation-stack'
import CategoryScreen from './CategoryScreen/CategoryScreen'
import FoodScreen from './FoodScreen/FoodScreen'
import FoodDetailScreen from './FoodDetailScreen/FoodDetailScreen'

export default createStackNavigator({
    Category: CategoryScreen,
    Foods: FoodScreen,
    FoodDetail: FoodDetailScreen,
});
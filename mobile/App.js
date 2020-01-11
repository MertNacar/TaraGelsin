import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthNavigator from './src/screens/AuthScreens/AuthNavigator'
import MainNavigator from './src/screens/MainScreens/MainNavigator'
import InitialScreen from './src/screens/InitialScreen/InitialScreen'

  export default createAppContainer(
      createSwitchNavigator(
        {
          Initial: InitialScreen,
          Auth: AuthNavigator,
          Main: MainNavigator
        },
        {
          initialRouteName: "Initial"
        }
      )
    )

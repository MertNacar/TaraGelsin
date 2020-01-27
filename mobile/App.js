import React from 'react'
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthNavigator from './src/screens/AuthScreens/AuthNavigator'
import MainNavigator from './src/screens/MainScreens/MainNavigator'
import ShoppingNavigator from './src/screens/ShoppingScreens/ShoppingNavigator'
import InitialScreen from './src/screens/InitialScreen/InitialScreen'
import { Provider } from 'react-redux'
import configureStore from './src/store/store'

const App = () => {
  let store = configureStore()
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Initial: InitialScreen,
      Auth: AuthNavigator,
      Main: MainNavigator,
      Shop: ShoppingNavigator
    },
    {
      initialRouteName: "Initial"
    }
  )
)

export default App

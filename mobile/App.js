import React from 'react'
import { StatusBar } from 'react-native'
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthNavigator from './src/screens/Auth/AuthNavigator'
import MainNavigator from './src/screens/Main/MainNavigator'
import ShoppingNavigator from './src/screens/Shopping/ShoppingNavigator'
import InitialScreen from './src/screens/Initial/InitialScreen'
import { Provider } from 'react-redux'
import configureStore from './src/store/store'
import { COLOR_BACKGROUND } from './src/constStyle/colors'
const App = () => {
  let store = configureStore()
  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={COLOR_BACKGROUND}
        barStyle="light-content"
      />
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

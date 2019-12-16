import React from 'react';
import {
  View,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

import { SwitchNavigator } from "react-navigation";
import AuthNavigator from './src/screens/AuthScreens/AuthNavigator'
import MainNavigator from './src/screens/MainScreens/MainNavigator'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [isSigned, setIsSigned] = useState(false)

  useEffect(() => {
    const token = await AsyncStorage.getItem('jwtToken');
    setIsSigned(!token.err)
    setLoading(false)
  }, [loading])


  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  } else {
    return createRootNavigator(isSigned)
  }
}

const createRootNavigator = userIsSigned => {
  return SwitchNavigator(
    {
      Auth: {
        screen: AuthNavigator
      },
      Main: {
        screen: MainNavigator
      }
    },
    {
      initialRouteName: userIsSigned ? "Main" : "Auth"
    }
  );
};

const styles = StyleSheet.create({
});

export default App;

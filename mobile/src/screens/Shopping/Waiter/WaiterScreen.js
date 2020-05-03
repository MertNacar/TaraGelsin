import React, { useState, useEffect } from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import * as Colors from '../../../constStyle/colors'
import { View, Image, SafeAreaView } from 'react-native'
import { Button, Text } from 'react-native-elements'
import WaiterImage from '../../../assets/images/waiter.png'
import TabBarLogout from '../../../components/TabBarLogout'
import styles from './style'

const WaiterScreen = () => {
  const [disable, setDisable] = useState(false)

  callWaiter = () => {
    setDisable(false)
    setTimeout(() => {
      setDisable(true)
    }, 10000);
  }

  useEffect(() => {
    return () => {
      clearTimeout()
    };
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Image source={WaiterImage} style={styles.image} />
      <View style={styles.row}>
        <Text h4 h4Style={styles.text}>Anında garsonu masanıza çağırın</Text>
        <Text style={styles.text}>Garsonu masanıza çağırabilir,</Text>
        <Text style={styles.text}>istek ve dileklerinizi anında iletebilirsiniz.</Text>
        <Text style={styles.text}>El kol sallayıp farklı şekillere girmenize gerek yok !</Text>
      </View>
      <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} buttonStyle={styles.buttonStyle} containerStyle={styles.buttonContainer} title="Garson Çağır" onPress={() => callWaiter()} />
    </SafeAreaView>
  )
}

export default createStackNavigator({
  Waiter: {
    screen: WaiterScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Garson",
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
  }
},
  {
    initialRouteName: "Waiter",
  });

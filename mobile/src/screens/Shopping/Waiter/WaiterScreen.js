import React, { useState, useEffect } from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import * as Colors from '../../../constStyle/colors'
import { View, Image } from 'react-native'
import { Button, Text } from 'react-native-elements'
import WaiterImage from '../../../assets/images/Waiter.png'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './style'

const WaiterScreen = () => {
  const [disable, setDisable] = useState(false)

  callWaiter = () => {
    let timeout = setTimeout(() => {
      setDisable(false)
    }, 1000 * 60 * 5);
    setDisable(true)
    timeout();
  }

  useEffect(() => {
    return () => {
      clearTimeout("timeout")
    };
  }, [])
  return (
    <View style={styles.container}>
      <Image source={WaiterImage} style={styles.image} />
      <View style={styles.row}>
        <Text h4 h4Style={styles.text}>Anında garsonu masanıza çağırın</Text>
        <Text style={styles.text}>Garsonu masanıza çağırabilir,</Text>
        <Text style={styles.text}>istek ve dileklerinizi anında iletebilirsiniz.</Text>
        <Text style={styles.text}>El kol sallayıp farklı şekillere girmenize gerek yok !</Text>
      </View>
      <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} buttonStyle={styles.buttonStyle} containerStyle={styles.buttonContainer} title="Garson Çağır" onPress={() => callWaiter()} />
    </View>
  )
}

export default createStackNavigator({
  Waiter: {
    screen: WaiterScreen,
    navigationOptions: {
      headerTitle: "Waiter",
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
  }
},
  {
    initialRouteName: "Waiter",
  });

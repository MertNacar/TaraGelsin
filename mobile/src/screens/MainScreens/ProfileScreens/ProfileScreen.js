import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { removeTokenStorage, removeUserStorage } from '../../../AsyncStorage/index'
const ProfileScreen = props => {

  logOut = async () => {
    await removeUserStorage()
    await removeTokenStorage()
    props.navigation.navigate("Auth")
  }
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="Çıkış Yap" type="clear" titleStyle={{ color: "red" }} onPress={() => logOut()} />
    </View>
  )
}

export default ProfileScreen

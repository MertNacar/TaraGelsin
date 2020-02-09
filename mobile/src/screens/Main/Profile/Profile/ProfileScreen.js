import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { removeTokenStorage, removeUserStorage } from '../../../../AsyncStorage/index'
import { removeUser } from '../../../../store/user/actionCreator'
import { connect } from 'react-redux'
const ProfileScreen = props => {

  const [user, setUser] = useState({ username: "", fullname: "", email: "", phone: "", gender: "", loginDate: "" })

  logOut = async () => {
    await removeUserStorage()
    await removeTokenStorage()
    props.removeUser()
    props.navigation.navigate("Auth")
  }

  useEffect(() => {
    setUser(props.getUser)
  }, [])

  return (
    <View>
      <View><Text>username : {user.username}</Text></View>
      <View><Text>fullname : {user.fullname}</Text></View>
      <View><Text>email : {user.email}</Text></View>
      <View><Text>gender : {user.gender}</Text></View>
      <View><Text>loginDate : {user.loginDate}</Text></View>
      <Button title="Çıkış Yap" type="clear" titleStyle={{ color: "red" }} onPress={() => logOut()} />
    </View>
  )
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

mapDispatchToProps = dispatch => {
  return {
    removeUser: () => dispatch(removeUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

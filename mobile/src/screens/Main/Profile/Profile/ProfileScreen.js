import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { removeTokenStorage, removeUserStorage } from '../../../../AsyncStorage/index'
import { removeUser } from '../../../../store/user/actionCreator'
import { connect } from 'react-redux'
const ProfileScreen = props => {

  const [user, setUser] = useState({ username: "", fullname: "", email: "", phone: "", loginDate: "" })

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
    <SafeAreaView>

      <ScrollView>
        <View>
          <Image />
          <Text>username : {user.username}</Text>
        </View>


        <View>
          <Icon />
          <Text>fullname : {user.fullname}</Text>
        </View>
        <View>
          <Icon />
          <Text>fullname : {user.email}</Text>
        </View>
        <View>
          <Icon />
          <Text>fullname : {user.phone}</Text>
        </View>
        <View><Text>loginDate : {user.loginDate}</Text></View>
        <Button title="Çıkış Yap" type="clear" titleStyle={{ color: "red" }} onPress={() => logOut()} />
      </ScrollView>
    </SafeAreaView>
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

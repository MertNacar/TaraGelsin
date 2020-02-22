import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { removeTokenStorage, removePhoneStorage } from '../../../../AsyncStorage/index'
import { removeUser } from '../../../../store/user/actionCreator'
import { removeCafe } from '../../../../store/cafe/actionCreator'
import { removeCart } from '../../../../store/cart/actionCreator'
import { removeCategories } from '../../../../store/category/actionCreator'
import { removeFoods } from '../../../../store/food/actionCreator'
import { connect } from 'react-redux'
import * as Colors from '../../../../constStyle/colors'
import profileInfos from './data'
import ProfileCard from '../../../../components/Profile/ProfileCard'
import styles from './style'
import moment from 'moment'
const ProfileScreen = props => {

  const [user, setUser] = useState({ phone: "", fullname: "", email: "" })

  logOut = async () => {
    await removePhoneStorage()
    await removeTokenStorage()
    props.removeUser()
    props.navigation.navigate("Auth")
  }

  useEffect(() => {
    setUser(props.getUser)
  }, [])

  goSubPage = (id) => {
    props.navigation.navigate(id)
  }

  let profileList = profileInfos.map((item, i) => {
    return (
      <ProfileCard
        key={i}
        LeftIconName={item.iconName}
        titleText={item.text}
        clickItem={() => goSubPage(item.onPress)}
      />
    )
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>

        <View style={styles.list}>
          {profileList}
        </View>

        <Button iconRight={true} icon={<Icon name="md-log-out" color="red" size={22} />}
          type="clear" title="Çıkış Yap" containerStyle={styles.buttonContainer} buttonStyle={styles.button} titleStyle={styles.buttonText} onPress={() => logOut()} />
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
    removeUser: () => dispatch(removeUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

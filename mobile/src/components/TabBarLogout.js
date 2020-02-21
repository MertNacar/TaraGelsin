import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Overlay, Divider, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { removeCafe } from '../store/cafe/actionCreator'
import { removeCart } from '../store/cart/actionCreator'
import { removeCategories } from '../store/category/actionCreator'
import { removeFoods } from '../store/food/actionCreator'
import { connect } from 'react-redux'
import * as Colors from '../constStyle/colors'

const TabBarLogout = props => {

  const [isVisible, setIsVisible] = useState(false)
  toggleOverlay = () => {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    return () => {
      setIsVisible(false)
    };
  }, [])

  logout = () => {
    props.removeCafe()
    props.removeCart()
    props.removeCategories()
    props.removeFoods()
    setIsVisible(false)
    props.navigate("Main")
  }

  cancelLogout = () => {
    setIsVisible(false)
  }

  return (
    <View>
      <TouchableOpacity onPress={() => toggleOverlay()}>
        <Icon name="md-log-out" size={26} color="red" style={{ paddingHorizontal: 15 }} />
      </TouchableOpacity>

      <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="white"
        overlayStyle={{ borderWidth: 1, borderRadius: 10 }}
        width="auto"
        height="auto"
      >
        <View style={{ justifyContent: "space-evenly" }}>
          <View style={{ margin: 3 }}>
            <Text>Gerçekten çıkmak istediğinize</Text>
            <Text style={{ textAlign: "center" }}>emin misiniz ?</Text>
          </View>
          <Divider style={{ height: 2, marginVertical: 3 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            <Button title="Evet" type="clear" onPress={() => logout()} />
            <Button title="Hayır" type="clear" onPress={() => cancelLogout()} />
          </View>
        </View>
      </Overlay>
    </View >
  )
}

mapDispatchToProps = dispatch => {
  return {
    removeCafe: () => dispatch(removeCafe()),
    removeCart: () => dispatch(removeCart()),
    removeCategories: () => dispatch(removeCategories()),
    removeFoods: () => dispatch(removeFoods())
  };
};

export default connect(null, mapDispatchToProps)(TabBarLogout)

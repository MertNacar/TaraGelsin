import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import * as Colors from '../../constStyle/colors'
import Icon from 'react-native-vector-icons/FontAwesome5'
const ExtraCard = props => {

  return (
    <CheckBox
      key={props.key}
      center
      title={props.item.name + "  " + props.item.cost + "  "}
      iconRight
      textStyle={styles.textTitle}
      iconType='material'
      checkedIcon='clear'
      uncheckedIcon='add'
      checkedColor='red'
      uncheckedColor={Colors.COLOR_BACKGROUND}
      checked={props.item.disable}
      onPress={props.addExtra}
    />
  )
}
const styles = StyleSheet.create({

  textTitle: {
    fontWeight: "bold",
    fontSize: 15
  }
})


export default ExtraCard
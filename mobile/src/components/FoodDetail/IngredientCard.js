import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import * as Colors from '../../constStyle/colors'
import Icon from 'react-native-vector-icons/Ionicons'

const IngredientCard = props => {
  return (
    <CheckBox
      center
      title={props.item.name}
      textStyle={styles.textTitle}
      checked={true}
    />
  )
}

const styles = StyleSheet.create({
  textTitle: {
    fontWeight: "bold",
    fontSize: 15
  }
})

export default IngredientCard

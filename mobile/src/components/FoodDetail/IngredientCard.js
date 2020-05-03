import React from 'react'
import { StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'

const IngredientCard = props => {
  return (
    <CheckBox
      center
      activeOpacity={1}
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

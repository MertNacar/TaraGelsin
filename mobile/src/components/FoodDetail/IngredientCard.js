import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import * as Colors from '../../constStyle/colors'

const IngredientCard = props => {
  return (
    <Text style={styles.ingredientTextColor}>{props.item.ingredientName}</Text>
  )
}

const styles = StyleSheet.create({
  ingredientCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginBottom: 6,
    width: "45%"
  },
  ingredientTextColor: {
    fontSize: 18,
  }
})

export default IngredientCard

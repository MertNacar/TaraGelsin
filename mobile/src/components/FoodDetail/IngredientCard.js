import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import * as Colors from '../../constStyle/colors'

const IngredientCard = props => {
  console.log(props.item.ingredientID)
  return (
    <View key={props.item.ingredientID}
      style={[styles.ingredientCard, props.addStyle]}>
      <Text style={styles.ingredientTextColor}>{props.item.ingredientName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ingredientCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 6,
    borderColor: Colors.COLOR_BACKGROUND,
    backgroundColor: Colors.COLOR_PRIMARY,
  },
  ingredientTextColor: {
    fontSize: 18,
    color: "white"
  }
})

export default IngredientCard

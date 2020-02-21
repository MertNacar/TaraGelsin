import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

const OrderCardButton = props => {
  return (
    <View style={styles.container}>

      <View style={{ flex: 1 }}>
        <Button buttonStyle={styles.buttonSmall} containerStyle={styles.buttonSmallContainer} title="-" onPress={props.decrementQuantity} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.quantityText}>{props.foodQuantity}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Button buttonStyle={styles.buttonSmall} containerStyle={styles.buttonSmallContainer} title="+" onPress={props.incrementQuantity} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  quantityText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700"
  },
  buttonSmallContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonSmall: {
    width: 25,
  },
})

export default OrderCardButton

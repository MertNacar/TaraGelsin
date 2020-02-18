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
        <Text style={{ textAlign: "center" }}>{props.foodQuantity}</Text>
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
  buttonSmallContainer: {
    flex: 1,
    alignSelf: "center"
  },
  buttonSmall: {
    width: 25,
  },
})

export default OrderCardButton

import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR_BACKGROUND } from '../../constStyle/colors'
const OrderCardButton = props => {
  return (
    <View style={styles.container}>

      <View style={{ flex: 1 }}>
        <Button buttonStyle={styles.buttonSmall} icon={<Icon name="md-remove" size={16} color="white" />} containerStyle={styles.buttonSmallContainer} onPress={props.decrementQuantity} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.quantityText}>{props.quantity}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Button buttonStyle={styles.buttonSmall} icon={<Icon name="md-add" size={16} color="white" />} containerStyle={styles.buttonSmallContainer} onPress={props.incrementQuantity} />
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
    width: 30,
    backgroundColor: COLOR_BACKGROUND
  },
})

export default OrderCardButton

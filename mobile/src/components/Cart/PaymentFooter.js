import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Button } from 'react-native-elements'
import IconAwe from 'react-native-vector-icons/FontAwesome5'

const PaymentFooter = props => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.cartBlock}>
        <Icon name="md-cart" size={34} />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
          <Text style={styles.textTotal}>{props.total}</Text>
          <IconAwe name="lira-sign" size={18} />
        </View>
      </View>
      <Button
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.buttonContainer}
        title="Ödemeye geç"
        onPress={props.goPay} />
    </View>
  )
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 2,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cartBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",

    alignItems: "center"
  },
  textTotal: {
    fontSize: 24,
    marginRight: 3
  },
  buttonContainer: {
    flex: 2,
  },
  buttonStyle: {

  },
})

export default PaymentFooter

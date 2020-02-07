import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import * as Colors from '../../constStyle/colors'
import Icon from 'react-native-vector-icons/FontAwesome5'
const ExtraCard = props => {

  useEffect(() => {
    console.log("h")
  }, [props.extras])

  return (
    <View key={props.item.extraID}
      style={[styles.extraCard, props.addStyle]}>
      <Button
        iconRight
        icon={<Icon name="lira-sign" color="white" size={16} />}
        titleStyle={styles.extraButtonTitle}
        title={props.item.extraName + "  " + props.item.extraCost + "  "}
        containerStyle={{ flex: 1 }}
        buttonStyle={[styles.buttonStyle, { opacity: props.item.disable ? 0.8 : 1 }]}
        onPress={props.addExtra}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  extraCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 6,
    borderColor: Colors.COLOR_BACKGROUND,
    backgroundColor: Colors.COLOR_SECONDARY
  },
  buttonStyle: {
    borderRadius: 10,
    paddingVertical: 5,
    backgroundColor: Colors.COLOR_SECONDARY,
  }
})


export default ExtraCard
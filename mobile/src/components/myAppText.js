import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const myAppText = props => {
  return (
    <View>
      <Text style={[styles.font, props.myTextStyle]}>{props.myText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  font: {
    fontFamily: "sans-serif",
    fontWeight: 'normal',
    fontSize: 12
  }
})


export default myAppText

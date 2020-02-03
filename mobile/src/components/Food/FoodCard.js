import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Tile } from 'react-native-elements'
import { PREFIX_IMAGEURL } from "react-native-dotenv";


const FoodCard = props => {

  goFoodDetails = () => {
    props.navigation.navigate("FoodDetails")
  }

  return (
    <View style={styles.cardContainer}>
      <Tile
        containerStyle={styles.tileContainer}
        imageSrc={{ uri: PREFIX_IMAGEURL + props.foodLink }}
        title={props.foodName}
        onPress={() => goFoodDetails()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    paddingTop: 7
  },
  tileContainer: {
    flex: 1,
  }
})


export default FoodCard

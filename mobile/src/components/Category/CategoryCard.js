import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Tile } from 'react-native-elements'
import { PREFIX_IMAGEURL } from "react-native-dotenv";
const screenWidth = Math.round(Dimensions.get('window').width);

const CategoryCard = (props) => {
  return (
    <View style={styles.cardContainer}>
      <Tile
        containerStyle={styles.tileContainer}
        imageSrc={{ uri: PREFIX_IMAGEURL + props.item.categoryImagePath }}
        featured
        title={props.item.categoryName}
        onPress={props.goFood}
        width={screenWidth - 15}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    paddingTop: 7,
  },
  tileContainer: {
    flex: 1,
  }
})


export default CategoryCard

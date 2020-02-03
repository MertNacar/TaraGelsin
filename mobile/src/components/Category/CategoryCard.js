import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Tile } from 'react-native-elements'
import { PREFIX_IMAGEURL } from "react-native-dotenv";


const CategoryCard = (props) => {
  return (
    <View style={styles.cardContainer}>
      <Tile

        containerStyle={styles.tileContainer}
        imageSrc={{ uri: PREFIX_IMAGEURL + props.categoryLink }}
        featured
        title={props.categoryName}
        onPress={props.goFood}
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


export default CategoryCard

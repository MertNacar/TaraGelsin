import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Tile } from 'react-native-elements'
import { PREFIX_IMAGEURL } from "react-native-dotenv";
import Icon from 'react-native-vector-icons/Ionicons'
import IconAwe from 'react-native-vector-icons/FontAwesome5'
const FoodCard = props => {

  return (
    <View style={styles.cardContainer}>
      <Tile
        containerStyle={styles.tileContainer}
        imageSrc={{ uri: PREFIX_IMAGEURL + props.food.foodImagePath }}
        title={props.food.foodName}
        onPress={props.goFoodDetails}
        titleStyle={styles.titleStyle}
      >
        <View style={styles.row}>
          <View style={styles.rowCost}>

            <Text>
              {props.food.foodCost}
            </Text>
            <IconAwe name="lira-sign" size={16} />
          </View>

          <View style={styles.rowTime}>
            <Text>
              {props.food.foodPreperationTime}
            </Text>
            <Icon name="md-time" size={18} />
          </View>
        </View>
      </Tile>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 5,
    marginBottom: 30
  },
  tileContainer: {
  },
  titleStyle: {
    textAlign: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  rowCost: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  rowTime: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
})


export default FoodCard

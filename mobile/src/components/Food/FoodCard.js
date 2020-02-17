import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Text } from 'react-native-elements'
import { Tile } from 'react-native-elements'
import { PREFIX_IMAGEURL } from "react-native-dotenv";
import Icon from 'react-native-vector-icons/Ionicons'
import IconAwe from 'react-native-vector-icons/FontAwesome5'
import * as Colors from '../../constStyle/colors';

const FoodCard = props => {

  return (
    <View style={styles.cardContainer}>
      <Tile
        imageSrc={{ uri: PREFIX_IMAGEURL + props.food.foodImagePath }}
        imageContainerStyle={{ marginHorizontal: 7 }}
        imageProps={{ resizeMode: "cover" }}
        title={props.food.foodName}
        onPress={props.goFoodDetails}
        titleStyle={styles.titleStyle}
      >
        <View style={styles.row}>
          <View style={styles.rowCost}>

            <Text h4>
              {props.food.foodCost}
            </Text>
            <Text> </Text>
            <IconAwe name="lira-sign" size={20} />
          </View>

          <View style={styles.rowTime}>
            <Text h4>
              {props.food.foodPreperationTime} min
            </Text>
            <Text> </Text>
            <Icon name="md-time" size={26} />
          </View>
        </View>
      </Tile>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    marginBottom: 30
  },
  titleStyle: {
    color: Colors.COLOR_BACKGROUND,
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

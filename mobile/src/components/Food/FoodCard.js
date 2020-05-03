import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Text } from 'react-native-elements'
import { Tile } from 'react-native-elements'
import { PREFIX_IMAGEURL } from "react-native-dotenv";
import Icon from 'react-native-vector-icons/Ionicons'
import IconAwe from 'react-native-vector-icons/FontAwesome5'
import * as Colors from '../../constStyle/colors';

const screenWidth = Math.round(Dimensions.get('window').width);
const FoodCard = props => {

  return (
    <View style={styles.cardContainer}>
      <Tile
        imageSrc={{ uri: PREFIX_IMAGEURL + props.food.imagePath }}
        imageProps={{ resizeMode: "cover" }}
        imageContainerStyle={{ marginHorizontal: 2 }}
        title={props.food.FoodName.name}
        onPress={props.goFoodDetails}
        contentContainerStyle={{ borderTopWidth: 1 }}
        containerStyle={{ width: screenWidth * 0.92 }}
        titleStyle={styles.titleStyle}
      >
        <View style={styles.row}>
          <View style={styles.rowCost}>

            <Text h4>
              {props.food.Branches[0].BranchFoods.cost}
            </Text>
            <Text> </Text>
            <IconAwe name="lira-sign" size={20} />
          </View>

          <View style={styles.rowTime}>
            <Text h4>
              {props.food.preperationTime} dk
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
    width: screenWidth * 0.92,
    borderWidth: 2,
    marginBottom: 30,

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

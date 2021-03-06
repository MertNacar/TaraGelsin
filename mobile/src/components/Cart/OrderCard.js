import React from 'react'
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import { PREFIX_IMAGEURL } from "react-native-dotenv";
import Icon from 'react-native-vector-icons/FontAwesome5'
import OrderCardButtons from './OrderCardButtons'
const screenWidth = Math.round(Dimensions.get('window').width);

const OrderCard = props => {
  let itemTotalCost = props.item.Branches[0].BranchFoods.cost * props.item.quantity
  return (
    <TouchableOpacity onPress={props.openFoodOverlay}>
      <View style={styles.cardContainer}>
        <ListItem

          leftElement={
            <Image
              source={{ uri: PREFIX_IMAGEURL + props.item.imagePath }}
              style={styles.image} />
          }

          title={props.item.FoodName.name}
          titleStyle={styles.titleText}
          subtitle={
            <View style={styles.cost}>
              <Text style={styles.costText}>{itemTotalCost}</Text>
              <Icon name="lira-sign" size={14} />
            </View>
          }

          rightElement={
            <OrderCardButtons
              quantity={props.item.quantity}
              incrementQuantity={props.incrementQuantity}
              decrementQuantity={props.decrementQuantity}
            />
          }
          disabled
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderBottomWidth: 1.5
  },
  titleText: {
    fontSize: 16,
    fontWeight: "700",
  },
  image: {
    height: 75,
    width: 90,
    resizeMode: "cover"
  },
  cost: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  costText: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 3
  },
})


export default OrderCard

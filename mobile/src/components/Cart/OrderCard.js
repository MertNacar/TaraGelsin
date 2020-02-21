import React from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import { PREFIX_IMAGEURL } from "react-native-dotenv";
import Icon from 'react-native-vector-icons/FontAwesome5'
import OrderCardButtons from './OrderCardButtons'
const screenWidth = Math.round(Dimensions.get('window').width);

const OrderCard = props => {
  return (
    <View style={styles.cardContainer}>
      <ListItem

        leftElement={
          <Image
            source={{ uri: PREFIX_IMAGEURL + props.item.foodImagePath }}
            style={styles.image} />
        }

        title={props.item.foodName}
        titleStyle={styles.titleText}
        subtitle={
          <View style={styles.cost}>
            <Text style={styles.costText}>{props.item.foodCost}</Text>
            <Icon name="lira-sign" size={14} />
          </View>
        }

        rightElement={
          <OrderCardButtons
            foodQuantity={props.item.foodQuantity}
            incrementQuantity={props.incrementQuantity}
            decrementQuantity={props.decrementQuantity}
          />
        }
        disabled
      />
    </View>
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

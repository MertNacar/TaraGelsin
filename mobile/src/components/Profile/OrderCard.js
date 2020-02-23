import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR_BACKGROUND } from '../../constStyle/colors'
import moment from 'moment'

const OrderCard = props => {
  let date = moment(props.item.createdAt).format("MMMM Do YYYY")
  return (
    <View>
      <ListItem
        containerStyle={styles.itemContainer}
        leftIcon={<Icon name="md-cart" size={46} color={COLOR_BACKGROUND} />}
        rightElement={
          <View style={styles.rightContainer}>
            <Text style={styles.text}>{props.item.orderCost}</Text>
            <Icon name="md-trash" size={24} color="red" />
          </View>
        }
        title={props.item.tblCafe.cafeName}
        subtitle={date}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    borderBottomWidth: 1,
  },
  rightContainer: {
    flexDirection: "row"
  },
  text: {
    marginRight: 3,
    fontSize: 16,
    fontWeight: "700"
  }
})


export default OrderCard

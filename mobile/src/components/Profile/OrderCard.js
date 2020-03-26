import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import IconAwe from 'react-native-vector-icons/FontAwesome5'
import { COLOR_BACKGROUND } from '../../constStyle/colors'
import moment from 'moment'

const OrderCard = props => {
  let date = moment(props.item.createdAt).format("DD MM YY")
  return (
    <View>
      <ListItem
        containerStyle={styles.itemContainer}
        leftIcon={<Icon name="md-cart" size={46} color={COLOR_BACKGROUND} />}
        rightElement={
          <View style={styles.rightContainer}>
            <Text style={styles.text}>{props.item.cost}</Text>
            <IconAwe name="lira-sign" size={18} color={COLOR_BACKGROUND} />
          </View>
        }
        title={props.item.Cafe.name}
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

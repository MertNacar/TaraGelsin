import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Colors from '../../constStyle/colors'
const CreditCard = props => {
  let prefix = props.item.number.substr(0, 4);
  let suffix = props.item.number.substr(14, 2);
  let main = "**********"
  let icon = props.item.selected ? "md-checkbox" : "md-checkbox-outline"
  return (
    <TouchableOpacity onPress={props.selectCard}>
      <ListItem
        containerStyle={styles.card}
        leftIcon={<Icon name="md-card" size={30} color={Colors.COLOR_BACKGROUND} />}
        checkmark={<Icon name={icon} size={30} color={Colors.COLOR_BACKGROUND} />}
        title={props.item.name}
        subtitle={prefix + main + suffix}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "#EEEDEA"
  }
})

export default CreditCard

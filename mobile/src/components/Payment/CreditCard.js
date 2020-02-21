import React from 'react'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Colors from '../../constStyle/colors'
const CreditCard = props => {
  return (
    <ListItem
      leftElement={<Icon name="md-card" size={30} color={Colors.COLOR_BACKGROUND} />}
      title={props.name}
      bottomDivider
    />
  )
}

export default CreditCard

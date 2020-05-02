import React from 'react'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Colors from '../../constStyle/colors'
const CreditCard = props => {
  let prefix = props.number.substr(0, 4);
  let suffix = props.number.substr(14, 2);
  let main = "**********"
  return (
    <ListItem
      leftIcon={<Icon name="md-card" size={30} color={Colors.COLOR_BACKGROUND} />}
      checkmark={<Icon name="md-checkbox" size={30} color={Colors.COLOR_BACKGROUND} />}
      title={props.name}
      subtitle={prefix + main + suffix}
    />
  )
}

export default CreditCard

import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR_BACKGROUND } from '../../constStyle/colors'

const ProfileCard = props => {
  let prefix = props.subTitleText.substr(0, 4);
  let suffix = props.subTitleText.substr(14, 2);
  let main = "**********"
  return (
    <View>
      <ListItem
        containerStyle={styles.itemContainer}
        leftIcon={<Icon name="md-card" size={46} color={COLOR_BACKGROUND} />}
        rightElement={
          <TouchableOpacity onPress={props.removeClick}>
            <Icon name="md-trash" size={24} color="red" />
          </TouchableOpacity>
        }
        title={props.titleText}
        subtitle={prefix + main + suffix}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    borderBottomWidth: 1,
  }
})


export default ProfileCard

import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR_BACKGROUND } from '../../constStyle/colors'
const ProfileCard = props => {
  return (
    <View>
      <TouchableOpacity onPress={props.clickItem}>
        <ListItem
          containerStyle={styles.itemContainer}
          leftIcon={<Icon name={props.LeftIconName} size={22} color={COLOR_BACKGROUND} />}
          rightIcon={<Icon name="md-arrow-forward" size={20} color={COLOR_BACKGROUND} />}
          title={props.titleText}
        />
      </TouchableOpacity>
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

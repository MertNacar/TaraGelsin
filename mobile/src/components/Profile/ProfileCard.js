import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
const ProfileCard = () => {
  return (
    <View>
      <TouchableOpacity>
        <ListItem
          key={props.id}
          leftIcon={<Icon name={props.LeftIconName} size={22} />}
          rightIcon={<Icon name="md-arrow-forward" size={20} />}
          title={props.titleText}
          bottomDivider
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

})


export default ProfileCard

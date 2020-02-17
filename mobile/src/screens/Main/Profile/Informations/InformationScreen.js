import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './style'

const InformationScreen = props => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>

        <Button iconRight={true} icon={<Icon name="md-log-out" color="red" size={22} />}
          type="clear" title="Çıkış Yap" containerStyle={styles.buttonContainer} buttonStyle={styles.button} titleStyle={styles.buttonText} onPress={() => logOut()} />
      </ScrollView>
    </SafeAreaView>
  )
}


export default InformationScreen

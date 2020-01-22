import React from 'react'
import { View, SafeAreaView, Text, ImageBackground, Image } from 'react-native'
import { Button } from 'react-native-elements'
import QrBackground from '../../../assets/images/QrCodebackground.png'
import QrCode from '../../../assets/images/QR-Code.png'
import styles from './style'
const QrScreen = props => {

  scanQrCode = () => {

  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={QrBackground} style={{ width: '100%', height: '100%' }}>
        <View style={styles.qrCode}>
          <Image source={QrCode}></Image>
        </View>
        <Button containerStyle={styles.buttonContainer} buttonStyle={styles.button} title="Tara Gelsin" onPress={() => scanQrCode()} />
      </ImageBackground>
    </SafeAreaView>
  )
}

export default QrScreen

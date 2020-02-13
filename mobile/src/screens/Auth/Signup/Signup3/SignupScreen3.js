import React, { useEffect } from 'react'
import { View, SafeAreaView, Image } from 'react-native'
import { Text, Button } from 'react-native-elements'
import styles from './style'
import verifiedUser from '../../../../assets/images/verifiedUser.png'

export default SignupScreen3 = props => {

  useEffect(() => {
    setTimeout(() => {
      goLogin()
    }, 6000);
    return () => {
      clearTimeout()
    };
  }, [])

  goLogin = () => {
    props.navigation.navigate("Login")
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image source={verifiedUser} style={styles.image} />
      <View style={styles.row}>
        <Text style={styles.text}>İşleminiz tamamlandı</Text>
        <Text style={styles.text}>Sizi giriş ekranına yönlendiriyoruz.</Text>
        <Text style={styles.text}>Giriş ekranına direkt olarak gitmek için Giriş butonuna basabilirsiniz.</Text>
      </View>
      <Button buttonStyle={styles.buttonStyle} containerStyle={styles.buttonContainer} title="Giriş" onPress={() => goLogin()} />
    </SafeAreaView>
  )
}

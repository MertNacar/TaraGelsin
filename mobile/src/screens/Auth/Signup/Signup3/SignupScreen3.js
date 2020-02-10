import React from 'react'
import { View, SafeAreaView, Image } from 'react-native'
import { Text, Button } from 'react-native-elements'
import styles from './style'
import verifiedUser from '../../../../assets/images/verifiedUser.png'

export default SignupScreen3 = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={verifiedUser} style={styles.image} />
      <View style={styles.row}>
        <Text h4 h4Style={styles.text}>Anında garsonu masanıza çağırın</Text>
        <Text style={styles.text}>Garsonu masanıza çağırabilir,</Text>
        <Text style={styles.text}>istek ve dileklerinizi anında iletebilirsiniz.</Text>
        <Text style={styles.text}>El kol sallayıp farklı şekillere girmenize gerek yok !</Text>
      </View>
      <Button disabled={disable} disabledStyle={{ opacity: 0.8 }} buttonStyle={styles.buttonStyle} containerStyle={styles.buttonContainer} title="Garson Çağır" onPress={() => callWaiter()} />
    </SafeAreaView>
  )
}

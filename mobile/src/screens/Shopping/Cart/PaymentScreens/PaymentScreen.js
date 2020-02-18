import React from 'react'
import { View, ScrollView, TextInput } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { connect } from 'react-redux'

const PaymentScreen = () => {

  onChangeText = (text) => {

  }

  return (
    <View>
      <ScrollView>

        <View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            maxLength={120}
            onChangeText={text => onChangeText(text)}
            multiline="true"
            textAlignVertical="top"
          />
        </View>

        <View>
          <Text h4>Ödeme yöntemi seçiniz</Text>

          <View>
            kartlarım
            Ödeme yöntemi ekle
          </View>
        </View>


        <View>
          <Text h4>Toplam kalori Kalori </Text>
        </View>


        <View>
          <Text>Sepet tutarı Discountsuz total</Text>
          <Text>İndirim yüzdesi - İndirim miktarı</Text>
          <Text>Ödeneccek Tutar</Text>
          <Text>Satış sözlemesini okudum.</Text>
          <Text>email adresine fatura yönlendiricektir.</Text>
        </View>

        <Button title="Öde" />
      </ScrollView>
    </View>
  )
}


mapStateToProps = state => {
  return {
    getUser: state.user,
    getFoods: state.foods,
    getCart: state.cart
  };
};


/*mapDispatchToProps = dispatch => {
  return {
    
  };
};*/

export default connect(mapStateToProps)(PaymentScreen);



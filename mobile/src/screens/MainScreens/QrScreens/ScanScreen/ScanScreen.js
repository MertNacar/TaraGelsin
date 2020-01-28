import React, { useState } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-elements'
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './style'
import * as Http from '../../../../utils/httpHelper';
import { updateCafe } from '../../../../store/cafe/actionCreator'
import { updateCategory } from '../../../../store/category/actionCreator'
import { connect } from 'react-redux'
const ScanScreen = props => {
  onSuccess = async (e) => {
    try {
      let qrCodeString = "04b304c9-3298-4d29-94dd-aeae409b8aa3/6c6b11f8-1cf5-497d-aaff-b513558338b1" // QR CODE string yakala
      let res = await Http.get(`main/qrCode/scan?qrCode=${qrCodeString}`, props.getUser.token)

      if (!res.err) {
        props.updateCafe(res.cafe)
        props.navigation.navigate("Shop")
      } else throw new Error()
    } catch {
      // Kullanıcıya Hata Göster
      props.navigation.goBack()
    }
  }

  return (
    <QRCodeScanner
      onRead={onSuccess}
      cameraType="back"
      cameraStyle={{ overflow: "hidden" }}
      topContent={
        <Text style={styles.qrCodeText}>
          Lütfen, masanıza ait qr kodu tarayınız.
        </Text>
      }
      bottomContent={
        <Button title="QrCode Tarandı" type="clear" onPress={(e) => onSuccess(e)} />

      }
    />
  );
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};

mapDispatchToProps = dispatch => {
  return {
    updateCategory: category => dispatch(updateCategory(category)),
    updateCafe: cafe => dispatch(updateCafe(cafe))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanScreen);

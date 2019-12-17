import React from 'react';
import {
  View,
  StyleSheet,
  View,
  Switch,
} from 'react-native';
import { Button, Text, Input } from 'react-native-elements'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

const App = () => {
  const [checkInformations, setCheckInformations] = useState(false)
  const [checkConditions, setCheckConditions] = useState(false)
  const [GoogleProgress, setGoogleProgress] = useState(false)
  const [userSaveValue, setUserSaveValue] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  userSaveSwitch = value => {
    setUserSaveValue(value)
  }

  changeText = (value, type) => {
    if (type === "username")
      setUsername(value)
    else {
      setPassword(value)
    }
  }

  /*logIn = () => {
    if()
  }*/

  return (
    <View>
      <Text h3>LOGO GELECEK</Text>
      <Text h3>GİRİŞ</Text>

      <Input
        placeholder='Kullanıcı Adı'
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        onChangeText={(value) => changeText(value, 'username')}
      />

      <Input
        placeholder='Şifre'
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={(value) => changeText(value, 'password')}
      />

      <CheckBox
        center
        title='Kullanım Koşulları ve Şartlarını Okudum'
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checked={checkConditions}
      />

      <CheckBox
        center
        title='KVKK Verilerimin işlenmesini onaylıyorum.'
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checked={checkInformations}
      />

      <Switch
        style={{ marginTop: 30 }}
        onValueChange={userSaveSwitch}
        value={userSaveValue}
      />

      <Button
        title="Giriş Yap"
        onPress={() => logIn()}
      />

      <Button
        title="Şifreni mi unuttun ?"
        type="clear"
      />

      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInGoogle}
        disabled={GoogleProgress} />

    </View>
  );
};

const styles = StyleSheet.create({
});

export default App;

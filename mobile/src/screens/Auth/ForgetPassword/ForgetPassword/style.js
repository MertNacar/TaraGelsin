import { StyleSheet } from 'react-native'
import * as Colors from '../../../../constStyle/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    justifyContent: "center",
    alignItems: "center"
  },

  form: {
    flex: 2,
    width: "90%",
    justifyContent: "flex-start",
    marginTop: "5%"
  },

  inputEmail: {
    width: "100%",
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15
  },

  inputCountry: {
    width: "28%",
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
  inputPhone: {
    width: "68%",
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonContainer: {
    marginTop: "7%",
    alignSelf: "center",
    width: "100%"
  },

  button: {
    backgroundColor: Colors.COLOR_BACKGROUND
  },

  textButtonContainer: {
    marginTop: "3%"
  },

  textButtonInput: {
    color: Colors.COLOR_BACKGROUND
  }

})
export default styles 
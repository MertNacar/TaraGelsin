import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "5%"
  },

  form: {
    flex: 1,
    width: "90%",
    marginTop: "3%"
  },

  row: {
    paddingTop: "1%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  name: {
    width: "48%",
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 10
  },

  phone: {
    height: "100%",
    width: "66%",
    borderWidth: 1,
    borderRadius: 10
  },

  password: {
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10
  },

  inputCountry: {
    height: "100%",
    width: "30%",
    borderWidth: 1,
    borderRadius: 10
  },

  button: {
    marginTop: "3%",
    alignSelf: "center",
    width: "100%"
  }
})
export default styles 
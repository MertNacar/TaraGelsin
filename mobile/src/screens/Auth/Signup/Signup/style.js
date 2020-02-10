import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
    alignItems: "center"
  },

  form: {
    flex: 1,
    paddingTop: "5%",
    width: "90%",
    //justifyContent: "flex-start",
  },

  row: {
    flex: 1,
    marginTop: 5,
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
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10
  },

  password: {
    flex: 1,
    width: "100%",
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 10
  },

  inputCountry: {
    height: "100%",
    width: "30%",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10
  },

  checks: {
    flex: 9,
    marginTop: "3%",
    justifyContent: "flex-start",

  },
  button: {
    marginTop: "3%",
    alignSelf: "center",
    width: "100%"
  }
})
export default styles 
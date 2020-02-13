import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  errText: {
    color: "red",
    textAlign: "center"
  },
  textContainer: {
    width: "90%",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16
  },
  input: {
    width: "90%",
    alignSelf: "center",
    marginTop: "10%",
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 10
  },
  inputText: {
    marginTop: 10,
    alignItems: "center",
    textAlign: "center"
  },
  button: {
    marginTop: "10%",
    alignSelf: "center",
    width: "50%",
  }
})
export default styles 
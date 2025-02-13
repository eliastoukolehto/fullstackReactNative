import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "./theme";

const styles = StyleSheet.create({
  input: {
    padding: 15,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.textSecondary
  },
  errorInput: {
    padding: 15,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.error
  }
})

const TextInput = ({ errorStatus, ...props}) => {

  if (errorStatus) {
  return <NativeTextInput
        style={styles.errorInput}
        {...props}
       />
  } else {
      return <NativeTextInput
        style={styles.input}
        {...props}
      />
  }
}

export default TextInput;
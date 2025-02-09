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

const TextInput = (props) => {

  if (props.errorStatus) {
  return <NativeTextInput
         style={styles.errorInput}
         placeholder={props.placeholder}
         value={props.formikValue}
         onChangeText={props.formik.handleChange(props.value)}
         secureTextEntry={props.secureTextEntry}
       />
  } else {
      return <NativeTextInput
        style={styles.input}
        placeholder={props.placeholder}
        value={props.formikValue}
        onChangeText={props.formik.handleChange(props.value)}
        secureTextEntry={props.secureTextEntry}
      />
  }
}

export default TextInput;
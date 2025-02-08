import { TextInput as NativeTextInput } from "react-native";

//TODO - figure out conditional styles

const styles = StyleSheet.create({
  input: {
    padding: 15,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.textSecondary
  },
})

const TextInput = (props) => {
  

  return (
    <View>
      <NativeTextInput
        style={styles.input}
        placeholder={props.placeholder}
        value={formik.values.username}
        onChangeText={props.handleChange(props.value)}
      />
      
    </View>
  )
}

export default TextInput;
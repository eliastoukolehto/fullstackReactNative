import { useFormik } from 'formik';
import * as yup from 'yup';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
  },
  input: {
    padding: 15,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.textSecondary
  },
  submit: {
    padding: 15,
    margin: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  submitText: {
    color: theme.colors.appBarText,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
  },
  errorText: {
    color: theme.colors.error,
    margin: 5
  }
})

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
})

const initialValues = {
  username: '',
  password: '',
}

const SignIn = () => {
  const onSubmit = values => {
    console.log('username: '+ values.username)
    console.log('password: '+ values.password)
  }

  const formik = useFormik({
    initialValues, 
    validationSchema,
    onSubmit
  })

  return(
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.submit} onPress={formik.handleSubmit}>
        <Text style={styles.submitText}>Sign In</Text>
      </Pressable>
    </View>
  )
};

export default SignIn;
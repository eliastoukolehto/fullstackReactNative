import { useFormik } from 'formik';
import * as yup from 'yup';
import { Pressable, StyleSheet, TextInput as NativeTextInput, View } from 'react-native';
import Text from './Text';
import theme from './theme';
import TextInput from './TextInput';

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

  errorStatusPassword = formik.touched.password && formik.errors.password
  errorStatusUsername = formik.touched.username && formik.errors.username

  return(
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        formik={formik}
        formikValue={formik.values.username}
        value='username'
        errorStatus={errorStatusUsername}
        secureTextEntry={false}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder='Password'
        value='password'
        formik={formik}
        formikValue={formik.values.password}
        errorStatus={errorStatusPassword}
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
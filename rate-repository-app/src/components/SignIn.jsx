import { useFormik } from 'formik';
import * as yup from 'yup';
import { Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from './theme';
import TextInput from './TextInput';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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
  const [signIn, result] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password })
      navigate('/')
    } catch (error) {
      console.log('error: '+error)
    }
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
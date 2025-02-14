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
    flexDirection: 'column'
  },
  input: {
    ...theme.inputField
  },
  submit: {
    ...theme.submitButton
  },
  submitText: {
    ...theme.submitText
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

  return <SignInContainer onSubmit={onSubmit}/>

};

export const SignInContainer = ({ onSubmit }) => {
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
        errorStatus={errorStatusUsername}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {errorStatusUsername && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        errorStatus={errorStatusPassword}
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry={true}
      />
      {errorStatusPassword && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.submit} onPress={formik.handleSubmit}>
        <Text style={styles.submitText}>Sign In</Text>
      </Pressable>
    </View>
  )
}

export default SignIn;
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextInput from './TextInput';
import theme from './theme';
import { Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
  }, 
  errorText: {
    color: theme.colors.error,
    margin: 5
  }
})

const validationSchema = yup.object().shape({
  username: yup.string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup.string()
    .min(5, 'Password must be at least 5 characters')
    .max(30, 'Password must be at most 30 characters')
    .required('Password is required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
})

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
}



const SignUpForm = () => {
  const [mutate, SignUpResult] = useMutation(SIGN_UP)
  const [signIn, SignInResult] = useSignIn();
  const navigate = useNavigate();
  

  const  onSubmit = async (values) => {
    const { username, password, passwordConfirmation } = values
    try {
      await mutate({ variables: {user: {username, password}} })
      await signIn({ username, password })
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

  const errors = {
    username: (formik.touched.username && formik.errors.username),
    password: (formik.touched.password && formik.errors.password),
    passwordConfirmation: (formik.touched.passwordConfirmation && formik.errors.passwordConfirmation),
  }

  return (
    <View style={styles.container}>
      <TextInput
        errorStatus={errors.username}
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {errors.username && (
        <Text style={ styles.errorText }>{formik.errors.username}</Text>
      )}
      <TextInput
        errorStatus={errors.password}
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry={true}
      />
      {errors.password && (
        <Text style={ styles.errorText }>{formik.errors.password}</Text>
      )}
      <TextInput
        errorStatus={errors.passwordConfirmation}
        placeholder='Confirm password'
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry={true}
      />
      {errors.passwordConfirmation && (
        <Text style={ styles.errorText }>{formik.errors.passwordConfirmation}</Text>
      )}
      <Pressable style={{ ...theme.submitButton }} onPress={formik.handleSubmit}>
        <Text style={{...theme.submitText}}>Sign Up</Text>
      </Pressable>
    </View>
  )
}

export default SignUpForm
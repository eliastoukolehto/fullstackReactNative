import { Pressable, StyleSheet, View } from "react-native"
import Text from "./Text"
import TextInput from "./TextInput"
import theme from "./theme"
import * as yup from 'yup';
import { useFormik } from "formik";
import useReview from "../hooks/useReview";
import { useNavigate } from "react-router-native";

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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number()
  .typeError('Rating must be a number')
  .min(0, 'Rating must be a positive number')
  .max(100, 'Rating must be between 0 and 100')
  .integer('Rating must be an integer')
  .required('Rating is required')
})

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
}


const ReviewForm = () => {
  const [review, result] = useReview();
  const navigate = useNavigate()


  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text} = values

    try {
      const data = await review({ ownerName, rating: Number(rating), repositoryName, text })
      navigate(`/${ownerName}.${repositoryName}`) 
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
    ownerName: (formik.touched.ownerName && formik.errors.ownerName),
    repositoryName: (formik.touched.repositoryName && formik.errors.repositoryName),
    rating: (formik.touched.rating && formik.errors.rating)
  } 

  return (
    <View style={styles.container}>
      <TextInput
        errorStatus={errors.ownerName}
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {errors.ownerName && (
        <Text style={ styles.errorText }>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        errorStatus={errors.repositoryName}
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {errors.repositoryName && (
        <Text style={ styles.errorText }>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        errorStatus={errors.rating}
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {errors.rating && (
        <Text style={ styles.errorText }>{formik.errors.rating}</Text>
      )}
      <TextInput
        errorStatus={false}
        placeholder='Review'
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        placeholderTextColor={theme.colors.textSecondary}
      />
      <Pressable style={{ ...theme.submitButton }} onPress={formik.handleSubmit}>
        <Text style={{...theme.submitText}}>Create a review</Text>
      </Pressable>
    </View>
  )
}

export default ReviewForm
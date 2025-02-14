import {  StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from './theme';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
import UserReviews from './UserReviews';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path='/' element={<RepositoryList/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path='/:repositoryId' element={<SingleRepository/>} />
        <Route path='/review' element={<ReviewForm/>}/>
        <Route path='/signup' element={<SignUpForm/>}/>
        <Route path='/userreviews' element={<UserReviews/>} />
      </Routes>
    </View>

  );
};

export default Main;
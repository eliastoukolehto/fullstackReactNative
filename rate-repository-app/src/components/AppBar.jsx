import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from './theme';
import { Link, useNavigate } from 'react-router-native';
import { useApolloClient, useMutation, useQuery } from "@apollo/client"
import { GET_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  text: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.appBarText,
    fontWeight: theme.fontWeights.bold,
    paddingHorizontal: 20
  },
  appBarContainer: {
    paddingTop: theme.paddings.appBarPaddingTop,
    paddingBottom: theme.paddings.appBarPaddingBottom,
    paddingLeft: theme.paddings.appBarPaddingLeft,
    flexDirection: 'row'
  },
});



const AppBar = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const { data, loading } = useQuery(GET_USER)
  const navigate = useNavigate()
  const user = data?.me
  //console.log('data: ' +JSON.stringify(data))


  const signOut = async () => {
    await authStorage.removeAccessToken()
    navigate('/')
    apolloClient.resetStore();
  }

  return (
  <View style={styles.container}>
    {loading && <Text>Loading...</Text>}
    <View style={styles.appBarContainer}>
      <ScrollView horizontal={true}>
        <Pressable>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
       
        {!user &&
        <View style={{ flexDirection: 'row' }}>
          <Pressable>
            <Link to="/signin">
              <Text style={styles.text}>Sign In</Text>
            </Link>
          </Pressable>
          <Pressable>
            <Link to="/signup">
              <Text style={styles.text}>Sign Up</Text>
            </Link>
          </Pressable>
        </View>} 
        {user &&
        <View style={{ flexDirection: 'row' }}>
          <Pressable>
            <Link to="/review">
              <Text style={styles.text}>Create a review</Text>
            </Link>
          </Pressable>
          <Pressable>
            <Link to="/userreviews">
              <Text style={styles.text}>My reviews</Text>
            </Link>
          </Pressable>
          <Pressable onPress={signOut}>
              <Text style={styles.text}>Sign Out</Text>
          </Pressable>
        </View>}
      </ScrollView>
    </View>
    
  </View>
  );
};

export default AppBar;
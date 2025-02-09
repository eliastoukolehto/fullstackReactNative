import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from './theme';
import { Link } from 'react-router-native';

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
  return (
  <View style={styles.container}>
    <View style={styles.appBarContainer}>
      <ScrollView horizontal={true}>
        <Pressable>
          <Link to="/">
            <Text style={styles.text}>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable>
          <Link to="/signin">
            <Text style={styles.text}>Sign In</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  </View>
  );
};

export default AppBar;
import { Image, StyleSheet, Text, View } from "react-native"
import theme from "./theme";

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row' 
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  statContainer: {
    display: 'flex',
    flex: 1
  },
  mainInfoContainer: {
    paddingLeft: 15,
    display: 'flex',
  },
  languageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    padding: 5,
    color: theme.colors.appBarText,
    borderRadius: 5,
    display: 'flex'
  },
  name: {
    fontWeight: theme.fontWeights.bold,
    paddingBottom: 0,
  },
  description: {
    color: theme.colors.textSecondary,
    paddingBottom: 5,
    paddingRight: 60,
  },
  statName: {
    color: theme.colors.textSecondary,
    textAlign: 'center'
  },
  stat: { 
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold
  }
});

const RepositoryItem = ({ item }) => {
  const reduceNumber = ( number ) => {
    switch (true) {
      case number >= 10000:
        return `${Math.round(number/1000)}k`
      case number >= 1000:
        return `${Math.round(number/100)/10}k`
      default:
        return `${number}`;
    }
  }
  const stars = reduceNumber(item.stargazersCount)
  const forks = reduceNumber(item.forksCount)

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image style={styles.avatar} source={{uri: item.ownerAvatarUrl}}/>
          <View style={styles.mainInfoContainer}>
            <Text style={styles.name}>{item.fullName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.languageContainer}>{item.language}</Text>
          </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.statContainer}>
          <Text style={styles.stat}>{stars}</Text>
          <Text style={styles.statName}>Stars</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.stat}>{forks}</Text>
          <Text style={styles.statName}>Forks</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.stat}>{item.reviewCount}</Text>
          <Text style={styles.statName}>Reviews</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.stat}>{item.ratingAverage}</Text>
          <Text style={styles.statName}>Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem
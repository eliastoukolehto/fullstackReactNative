
import RepositoryItem from "./RepositoryItem";
import { FlatList, StyleSheet, View} from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import theme from "./theme";
import {format, parse } from 'date-fns'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
    flexDirection: "row"
  },
  reviewContainer: {
    paddingHorizontal: 10,
    flexDirection: "column"
  },
  rating: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center'
  },
  ratingText: {
    color:  theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    fontSize: 18,
  },
  usernameText: {
    fontWeight: theme.fontWeights.bold,
    flex: 1
  },
  dateText: {
    color: theme.colors.textSecondary,
    flex: 1
  }
})

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {

  const date = format(review.createdAt, "dd.MM.yyyy")

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text style={styles.usernameText}>{review.user.username}</Text>
        <Text style={styles.dateText}>{date}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
};

const SingleRepository = () => {
  const { repositoryId } = useParams();
  const { repository, loading } = useRepository(repositoryId)

  if (loading || !repository) return(
    <View>
      <Text>Repository not found</Text>
    </View>
  )
  
  const reviewNodes = repository.reviews
  ? repository.reviews.edges.map(edge => edge.node)
  : [];

  return(
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repository} />}
    />
  )
}  

export default SingleRepository
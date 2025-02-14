import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { GET_USER } from "../graphql/queries";
import theme from "./theme";
import { format } from "date-fns";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 15,
    flexDirection: 'column'
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingTop: 10
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
  reviewContainer: {
    paddingHorizontal: 10,
    flexDirection: "column"
  },
  dateText: {
    color: theme.colors.textSecondary,
    flex: 1
  },
  nameText: {
    fontWeight: theme.fontWeights.bold,
    flex: 1
  },
  submit: {
    ...theme.submitButton,
    flex: 1
  },
  submitWarning: {
    ...theme.submitButton,
    backgroundColor: theme.colors.error,
    flex: 1
  },
  submitText: {
    ...theme.submitText
  },
})                                  

const ReviewItem = ({ review }) => {

  const navigate = useNavigate()
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(DELETE_REVIEW)
  const date = format(review.createdAt, "dd.MM.yyyy")

  handleRepositoryLink = () => {
    console.log('repository link pressed')
    navigate(`/${review.repository.id}`)
  }

  handleDelete = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: async () => {
          
          await mutate({ variables: {deleteReviewId: review.id}})
          apolloClient.resetStore();
          console.log('Delete pressed:'+review.repository.id)
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row"}}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text style={styles.nameText}>{review.repository.name}</Text>
          <Text style={styles.dateText}>{date}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.submit} onPress={handleRepositoryLink}>
          <Text style={styles.submitText}>View Repository</Text>
        </Pressable>
        <Pressable style={styles.submitWarning} onPress={handleDelete}>
          <Text style={styles.submitText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  )
};

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { data, loading } = useQuery(GET_USER, {variables: {includeReviews: true}})
  user = data?.me

  if (!user) return

  const reviewNodes = user.reviews
  ? user.reviews.edges.map(edge => edge.node)
  : [];

  return(
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  )
}

export default UserReviews
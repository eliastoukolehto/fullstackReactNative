import { useApolloClient, useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations"


const useReview = () => {
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(CREATE_REVIEW)

  const review = async ({ ownerName, rating, repositoryName, text }) => {
    const { data } = await mutate({ 
      variables: {review: {ownerName, rating, repositoryName, text}}
    })
    apolloClient.resetStore();
    return data
  }

  return [review, result]
}

export default useReview
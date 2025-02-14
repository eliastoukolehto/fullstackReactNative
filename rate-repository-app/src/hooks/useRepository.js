import { useQuery } from "@apollo/client"
import { GET_REPOSITORY } from "../graphql/queries"


const useRepository = (repositoryId, first) => {

  const variables = {id: repositoryId, first: first}

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: 'cache-and-network'
  })

  const handleFetchMore = () => {
    //console.log('data.repository.reviews:'+JSON.stringify(data.repository.reviews))
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
}

  return { 
    repository: data?.repository, 
    fetchMore: handleFetchMore,
    loading }
}

export default useRepository
import { useQuery } from "@apollo/client"
import { GET_REPOSITORY } from "../graphql/queries"


const useRepository = (repositoryId) => {


  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: {id: repositoryId},
    fetchPolicy: 'cache-and-network'
  })

  return { repository: data?.repository, loading }
}

export default useRepository
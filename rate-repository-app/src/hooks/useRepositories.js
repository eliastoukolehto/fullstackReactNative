//import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = ( orderBySelection, filter ) => {

  const [orderBy, setOrderBy] = useState('CREATED_AT')
  const [orderDirection, setOrderDirection] = useState('DESC')

  useEffect(() => {
    parseSelection()
  }, [orderBySelection])
  
  const parseSelection = () => {
    switch (orderBySelection) {
      case 'latest':
        setOrderBy('CREATED_AT')
        setOrderDirection('DESC')
        break;
      case 'highestRated':
        setOrderBy('RATING_AVERAGE')
        setOrderDirection('DESC')
        break;
      case 'lowestRated':
        setOrderBy('RATING_AVERAGE')
        setOrderDirection('ASC')
        break;
      default:
        setOrderBy('CREATED_AT')
        setOrderDirection('DESC')
        break;
    }
  }

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    variables: {orderBy: orderBy, orderDirection: orderDirection, searchKeyword: filter},
    fetchPolicy: 'cache-and-network'
  })
  
  return { repositories: data?.repositories, loading }
}

export default useRepositories
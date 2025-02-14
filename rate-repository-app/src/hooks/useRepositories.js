//import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = ( first, orderBySelection, filter ) => {

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

  const variables = {first: first, orderBy: orderBy, orderDirection: orderDirection, searchKeyword: filter}

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network'
  })
  
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  
  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading
  };
};


export default useRepositories
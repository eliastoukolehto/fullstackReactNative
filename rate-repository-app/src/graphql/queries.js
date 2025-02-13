import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderDirection: OrderDirection, 
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    ){
    repositories(
      orderDirection: $orderDirection,
      orderBy: $orderBy, 
      searchKeyword: $searchKeyword
      ) {
      totalCount
      edges {
        node {
          ...RepositoryFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${REPOSITORY_FIELDS}
`

export const GET_USER = gql`
  query {
    me {
      username
      id
    }
  }
`

export const GET_REPOSITORY = gql`
  query repository($id: ID!){
    repository(id: $id) {
      ...RepositoryFields,
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`
import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderDirection: OrderDirection, 
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $first: Int
    $after: String
    ){
    repositories(
      orderDirection: $orderDirection,
      orderBy: $orderBy, 
      searchKeyword: $searchKeyword
      first: $first
      after: $after
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
  query getCurrentUser($includeReviews: Boolean = false){
    me {
      username
      id
      reviews @include(if: $includeReviews){
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              name
              id
            }
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query repository($id: ID! $first: Int $after: String){
    repository(id: $id) {
      ...RepositoryFields,
      url
      reviews(first: $first, after: $after) {
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
        cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`
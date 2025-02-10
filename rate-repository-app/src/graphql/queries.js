import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
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
import { gql } from "@apollo/client";


export const SIGN_IN = gql`
  mutation authenticate($credentials: AuthenticateInput) {
    authenticate(
      credentials: $credentials
    ) {
      accessToken
      expiresAt
    }
  }
`

export const SIGN_UP = gql`
  mutation createUser($user: CreateUserInput) {
    createUser(
      user: $user
    ) {
      id
      username
      createdAt
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(
      review: $review
    ) {
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
`

export const DELETE_REVIEW = gql`
  mutation deleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`
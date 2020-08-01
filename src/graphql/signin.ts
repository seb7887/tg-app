import { gql } from '@apollo/client'

export const SIGN_IN = gql`
  mutation Login($input: LoginInput!) {
    signin(loginData: $input) {
      jwt
    }
  }
`

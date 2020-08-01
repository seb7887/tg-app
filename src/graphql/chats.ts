import { gql } from '@apollo/client'

export const CHATS = gql`
  query Chats {
    chats {
      id
      name
      lastMessage {
        content
      }
    }
  }
`

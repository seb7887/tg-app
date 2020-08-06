import { gql } from '@apollo/client'

export const CHATS = gql`
  query Chats {
    chats {
      id
      name
      participants {
        id
        name
      }
      messages {
        content
        sender {
          id
          name
        }
        recipient {
          id
          name
        }
        createdAt
      }
      lastMessage {
        content
      }
    }
  }
`

export const USERS = gql`
  query Users {
    chats {
      participants {
        id
        name
      }
    }
  }
`

import { gql } from '@apollo/client'

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: NewMessageInput!) {
    addMessage(newMessage: $input) {
      message {
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
    }
  }
`

export const MSG_ADDED = gql`
  subscription OnMessageAdded {
    messageAdded {
      message {
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
    }
  }
`

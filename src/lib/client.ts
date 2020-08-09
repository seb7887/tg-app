import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import Constants from 'expo-constants'

const HTTP_LINK = Constants.manifest.extra.apiUrl
const WS_LINK = HTTP_LINK.replace(/^https?/, 'ws')

const httpLink = createHttpLink({ uri: HTTP_LINK })
const wsLink = new WebSocketLink({
  uri: WS_LINK,
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})

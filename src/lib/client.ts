import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const HTTP_LINK = 'https://tg-clone-db.herokuapp.com/graphql'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: HTTP_LINK }),
})

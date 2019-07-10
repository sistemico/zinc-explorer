import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_URL,
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WS_URL,
  options: {
    reconnect: true,
  },
})

const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const definition = getMainDefinition(query)

      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    httpLink,
  ),
  cache: new InMemoryCache(),
})

export default client

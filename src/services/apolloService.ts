import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, split, OperationVariables } from '@apollo/client'
import { WebSocketLink } from '@apollo/link-ws'
import { onError } from '@apollo/link-error'
import { setContext } from '@apollo/link-context'
import { getMainDefinition } from 'apollo-utilities'
import { userService } from '../services/userService'
import { API_URL, WS_URL, TOKEN } from '../helpers/constants'
import Cookie from 'js-cookie'

global.fetch = require('node-fetch')

let globalApolloClient: any = null

const logout = () => {
  if (!!userService.loggedInUser) {
  userService.logout()
  // eslint-disable-next-line no-restricted-globals
  location.replace("/")
  }
}

const wsLinkwithoutAuth = () =>
  new WebSocketLink({
    uri: WS_URL,
    options: {
      reconnect: true,
    },
  })

const wsLinkwithAuth = (token: string) =>
  new WebSocketLink({
    uri: WS_URL,
    options: {
      reconnect: true,
      connectionParams: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

function createIsomorphLink() {
  return new HttpLink({
    uri: API_URL,
  })
}

function createWebSocketLink() {
  const token = Cookie.getJSON(TOKEN)
  return token ? wsLinkwithAuth(token) : wsLinkwithoutAuth()
}

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map((err) => {
      console.warn(err.message)
      return null
    })
  }
  if (networkError) {
    console.warn(networkError)
    logout()
  }
})

const authLink = setContext((_, { headers }) => {
  const token = Cookie.getJSON(TOKEN)
  return token
    ? {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      }
    : {
        headers: {
          ...headers,
        },
      }
})

const httpLink = ApolloLink.from([errorLink, authLink, createIsomorphLink()])

export function createApolloClient(initialState = {}) {
  const ssrMode = typeof window === 'undefined'
  const cache = new InMemoryCache().restore(initialState)

  const link = ssrMode
  ? httpLink
  : split(
      ({ query }: any) => {
        const { kind, operation }: OperationVariables = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      createWebSocketLink(),
      httpLink
    )

  return new ApolloClient({
    ssrMode,
    link,
    cache,
  })
}

export function initApolloClient(initialState = {}) {
  if (typeof window === 'undefined') {
    return createApolloClient(initialState)
  }

  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState)
  }

  return globalApolloClient
}

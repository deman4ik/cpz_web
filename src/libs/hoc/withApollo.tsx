/* eslint-disable no-return-await */
import React from 'react';
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

import { resolvers } from '../../graphql/resolvers';
import { typeDefs } from '../../graphql/typeDefs';
import { defaultState } from '../../graphql/defaultState';
import { setAccessToken, getExpiredAccessToken } from '../accessToken';

interface Definintion {
  kind: string;
  operation?: string;
}
const ssrMode = !process.browser;
const httpLink = createHttpLink({
  uri: `https://${process.env.HASURA_URL}`,
});

const connectionParams = async (ctx) => {
  const token = await getExpiredAccessToken(ctx);
  const headers = {} as { authorization?: string };
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return { headers };
};

export default withApollo(
  (ctx) => {
    const authLink = setContext(async () => await connectionParams(ctx));
    const contextLink = authLink.concat(httpLink);
    let link = contextLink;
    if (!ssrMode) {
      const wsLink = new WebSocketLink({
        uri: `wss://${process.env.HASURA_URL}`,
        options: {
          reconnect: true,
          timeout: 30000,
          connectionParams: async () => await connectionParams(ctx)
        }
      });
      link = split(
        ({ query }) => {
          const { kind, operation }: Definintion = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        contextLink,
      );
    }

    const cache = new InMemoryCache().restore(ctx.initialState || {});
    cache.writeData({ data: defaultState });

    const client = new ApolloClient({
      link,
      cache,
      resolvers,
      connectToDevTools: !ssrMode,
      typeDefs,
      ssrMode
    });
    client.onClearStore(async () => {
      client.writeData({ data: defaultState });
    });
    return client;
  },
  {
    render: ({ Page, props }) => {
      if (typeof props.accessToken !== 'undefined') {
        setAccessToken(props.accessToken);
      }

      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);

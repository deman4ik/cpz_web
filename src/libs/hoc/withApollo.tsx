import React from "react";
import withApollo from "next-with-apollo";
import { ApolloClient, createHttpLink, split, ApolloProvider, from } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import gql from "graphql-tag";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { InMemoryCache } from "@apollo/client/cache";
import { onError } from "@apollo/client/link/error";

import { resolvers } from "graphql/resolvers";
import { typeDefs } from "graphql/typeDefs";
import { defaultState } from "graphql/defaultState";
import { getAccessToken, nullifyAccessToken } from "../accessToken";
import { httpErrors } from "config/constants";
import { RetryLink } from "@apollo/client/link/retry";

interface Definintion {
    kind: string;
    operation?: string;
}

const cacheQuery = gql`
    query default_state @client {
        user_id
        Limit {
            signals
            robots
        }
        NotificationsProps {
            filters
        }
        SearchProps {
            props
        }
        ModalVisible {
            isVisible
            type
        }
        ChartData {
            limit
            robotId
            timeframe
        }
        Robot {
            cache {
                id
                tableName
            }
            id
            userRobotId
            name
            subs {
                settings
                asset
                exchange
                currency
            }
        }
    }
`;

const ssrMode = !process.browser;

const httpLink = createHttpLink({
    uri: `https://${process.env.HASURA_URL}`,
    credentials: "include"
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
        // eslint-disable-next-line consistent-return
        graphQLErrors.forEach(async ({ extensions, message }) => {
            if (extensions.code === httpErrors.JWTError) {
                nullifyAccessToken();
            } else {
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                    headers: {
                        ...oldHeaders,
                        authorization: `Bearer ${getAccessToken()}`
                    }
                });
                console.info(`Retrying ~ ${operation.operationName}`);
                console.error(`[GraphQL error]: ${message}`);
                return forward(operation);
            }
        });
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

const retryLink = new RetryLink({
    delay: {
        initial: 200,
        max: 500
    },
    attempts: {
        max: 2,
        retryIf: (error, _operation) => !!error
    }
});

const connectionParams = () => {
    const accessToken = getAccessToken();
    const headers = {} as { authorization?: string };
    if (accessToken) {
        headers.authorization = `Bearer ${accessToken}`;
    }
    return { headers };
};
export default withApollo(
    (ctx) => {
        const authLink = setContext(() => connectionParams());
        const contextLink = from([retryLink, errorLink, authLink.concat(httpLink)]);
        let link = contextLink;
        if (!ssrMode) {
            const wsLink = new WebSocketLink({
                uri: `wss://${process.env.HASURA_URL}`,
                options: {
                    reconnect: true,
                    timeout: 30000,
                    connectionParams: () => connectionParams()
                }
            });
            link = split(
                ({ query }) => {
                    const { kind, operation }: Definintion = getMainDefinition(query);
                    return kind === "OperationDefinition" && operation === "subscription";
                },
                wsLink,
                contextLink
            );
        }

        const cache = new InMemoryCache().restore(ctx.initialState || {});
        cache.writeQuery({
            query: cacheQuery,
            data: defaultState
        });

        const client = new ApolloClient({
            link,
            cache,
            resolvers,
            connectToDevTools: !ssrMode && process.env.NODE_ENV === "development",
            typeDefs,
            ssrMode
        });
        client.onClearStore(async () => {
            client.writeQuery({
                query: cacheQuery,
                data: defaultState
            });
        });
        return client;
    },
    {
        render: ({ Page, props }) => {
            return (
                <ApolloProvider client={props.apollo}>
                    <Page {...props} />
                </ApolloProvider>
            );
        }
    }
);

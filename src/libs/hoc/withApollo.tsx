import React from "react";
import withApollo from "next-with-apollo";
import { ApolloClient, createHttpLink, ApolloProvider, ApolloLink, split, fromPromise } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import gql from "graphql-tag";
import { setContext } from "@apollo/client/link/context";
import { InMemoryCache } from "@apollo/client/cache";
import { onError } from "@apollo/client/link/error";

import { resolvers } from "graphql/resolvers";
import { typeDefs } from "graphql/typeDefs";
import { defaultState } from "graphql/defaultState";
import { getAccessToken, putTokenInCookie } from "../accessToken";
import { getMainDefinition } from "@apollo/client/utilities";
import { fetchAccessToken, logout } from "libs/auth";
import redirect from "libs/redirect";
import { httpErrors } from "config/constants";

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

const updateToken = async () => {
    try {
        const { data } = await fetchAccessToken();
        const { accessToken } = data && data.result;
        putTokenInCookie(accessToken);
    } catch (e) {
        console.error("REFRESH TOKEN ERROR: Failed to renew accessToken");
        logout();
    }
};
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors)
        // eslint-disable-next-line no-restricted-syntax
        for (const error of graphQLErrors) {
            const { extensions, message } = error;
            if (extensions.code === httpErrors.JWTError) {
                console.info(`Retrying ~ ${operation.operationName}`);
                return fromPromise(updateToken()).flatMap(() => forward(operation));
            }
            console.error(`[GraphQL error]: ${message}`);
            return fromPromise(new Promise((res) => res())).flatMap(() => forward(operation));
        }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
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
        const contextLink = ApolloLink.from([errorLink, authLink.concat(httpLink)]);
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

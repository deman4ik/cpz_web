import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_SUBSCRIPTIONS = gql`
    query subscriptions {
        subscriptions {
            name
            description
            options: subscription_options {
                name
                sort_order
                unit
                amount
                price_month
                price_total
                discount
                free_months
            }
        }
    }
`;

export const usePricing = (): any => {
    const { loading, error, data } = useQuery(GET_SUBSCRIPTIONS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return data.subscriptions[0];
};

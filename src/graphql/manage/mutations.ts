import gql from "graphql-tag";

/*users filters*/
export const SET_USERS_FILTERS = gql`
    mutation setUsersFilters($filters: String, $orders: String) {
        setSearchProps(filters: $filters, orders: $orders) @client
    }
`;

import gql from 'graphql-tag';

export const GET_MARKETS = gql`
  query markets($asset: String!, $exchange: String!, $currency: String!) {
    markets(
      where: {
        asset: { _eq: $asset }
        exchange: { _eq: $exchange }
        currency: { _eq: $currency }
      }
    ){
      exchange
      asset
      limits
      currency
      precision
    }
  }
`;

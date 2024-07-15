import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query getUser {
    getUser {
      data {
        email {
          lastEmail
          updatedAt
          value
          verified
        }
        balance
        steamid
        tradeLink
      }
    }
  }
`;

export const GET_BALANCE = gql`
  query getBalance {
    getBalance {
      success
      message
      data {
        balance
      }
    }
  }
`;

export const GET_LIVE_BALANCE = gql`
  subscription getLiveBalance {
    getLiveBalance {
      success
      message
      data {
        balance
      }
    }
  }
`;

export const GET_LIVE_MESSAGES = gql`
  subscription getLiveMessages {
    getLiveMessages {
      success
      message
      data
      type
      request
    }
  }
`;

export default { GET_USER_INFO, GET_BALANCE, GET_LIVE_BALANCE, GET_LIVE_MESSAGES };

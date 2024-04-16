import { gql } from '@apollo/client';

const GET_RAFFLES = gql`
  query getRaffles {
    getRaffles {
      success
      message
      data {
        activeRaffles {
          createdAt
          finishedAt
          type
          description
          gameId
          info {
            ticketPrice
            totalTickets
            prizesTotalValue
            bets {
              amountBet
              createdAt
              gameId
              prize
              info {
                randomTicket
                tickets
                type
              }
              userRef {
                avatar
                userId
                username
              }
            }
            prizes
          }
        }

        endedRaffles {
          createdAt
          finishedAt
          type
          description
          gameId
          info {
            ticketPrice
            totalTickets
            prizesTotalValue
            bets {
              amountBet
              createdAt
              gameId
              prize
              info {
                randomTicket
                tickets
                type
              }
              userRef {
                avatar
                userId
                username
              }
            }
            prizes
            winnersBetsInfo {
              hash
              drawnNumber
              betRef {
                amountBet
                createdAt
                gameId
                prize
                info {
                  tickets
                }
                userRef {
                  avatar
                  username
                  userId
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_LIVE_RAFFLES = gql`
  subscription getLiveRaffles {
    getLiveRaffles {
      success
      message
      data {
        activeRaffles {
          createdAt
          finishedAt
          type
          description
          gameId
          info {
            ticketPrice
            totalTickets
            prizesTotalValue
            bets {
              amountBet
              createdAt
              gameId
              prize
              info {
                randomTicket
                tickets
                type
              }
              userRef {
                avatar
                userId
                username
              }
            }
            prizes
          }
        }

        endedRaffles {
          createdAt
          finishedAt
          type
          description
          gameId
          info {
            ticketPrice
            totalTickets
            prizesTotalValue
            bets {
              amountBet
              createdAt
              gameId
              prize
              info {
                randomTicket
                tickets
                type
              }
              userRef {
                avatar
                userId
                username
              }
            }
            prizes
            winnersBetsInfo {
              drawnNumber
              hash
              betRef {
                amountBet
                createdAt
                gameId
                prize
                info {
                  tickets
                }
                userRef {
                  avatar
                  username
                  userId
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default { GET_RAFFLES, GET_LIVE_RAFFLES };

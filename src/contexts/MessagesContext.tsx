/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import USER_QUERIES from '../graphql/UserInfoGQL';
import { gqlSubscription } from '../hooks/useGraphQLService';
import { IGQLResponses } from '../interfaces/IGQLResponses';

const MessagesContext = React.createContext<{
  messages: {
    messagesData: IGQLResponses<string>[] | undefined;
    setFilteredResponse: React.Dispatch<React.SetStateAction<IGQLResponses<any>[] | undefined>> | undefined;
    raffleCreationMessages: IGQLResponses<any>[];
    setRaffleCreationMessages: React.Dispatch<React.SetStateAction<IGQLResponses<any>[]>>;
    walletVerificationMessages: IGQLResponses<any>[];
    setWalletVerificationMessages: React.Dispatch<React.SetStateAction<IGQLResponses<any>[]>>;
  };
}>({
  messages: {
    messagesData: undefined,
    setFilteredResponse: undefined,
    raffleCreationMessages: [],
    setRaffleCreationMessages: () => {},
    walletVerificationMessages: [],
    setWalletVerificationMessages: () => {},
  },
});

export default function MessagesContextProvider({ children }: { children: ReactNode }) {
  const response = gqlSubscription<string, 'getLiveMessages'>({
    gql: USER_QUERIES.GET_LIVE_MESSAGES,
    loginRequired: true,
  });

  const [filteredResponse, setFilteredResponse] = useState<IGQLResponses<any>[] | undefined>(undefined);
  const [raffleCreationMessages, setRaffleCreationMessages] = useState<IGQLResponses<any>[]>([]);
  const [walletVerificationMessages, setWalletVerificationMessages] = useState<IGQLResponses<any>[]>([]);

  const showToast = (message: IGQLResponses<string>) => {
    if (message.success) {
      toast.success(message.message);
    } else {
      toast.error(message.message);
    }
  };

  useEffect(() => {
    if (response && response.data && response.data.getLiveMessages) {
      const newMessage = response.data.getLiveMessages;

      let dataFiltered = newMessage.data;
      if (newMessage.data) {
        try {
          dataFiltered = JSON.parse(newMessage.data);
        } catch (error) {
          console.error('Failed to parse message data:', error);
        }
      }

      setFilteredResponse((prev) => {
        return prev ? [...prev, { ...newMessage, data: dataFiltered }] : [{ ...newMessage, data: dataFiltered }];
      });
    }
  }, [response && response.data]);

  return (
    <MessagesContext.Provider
      value={{
        messages: {
          messagesData: filteredResponse,
          setFilteredResponse,
          raffleCreationMessages,
          setRaffleCreationMessages,
          walletVerificationMessages,
          setWalletVerificationMessages,
        },
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export const useMessagesContext = () => useContext(MessagesContext);

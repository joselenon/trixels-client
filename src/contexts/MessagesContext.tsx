import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import USER_QUERIES from '../graphql/UserInfoGQL';
import { gqlSubscription } from '../hooks/useGraphQLService';
import { IGQLResponses } from '../interfaces/IGQLResponses';

const MessagesContext = React.createContext<{
  messages: {
    messagesData: IGQLResponses<string>[] | undefined;
    setFilteredResponse: React.Dispatch<React.SetStateAction<IGQLResponses<any>[] | undefined>> | undefined;
  };
}>({
  messages: { messagesData: undefined, setFilteredResponse: undefined },
});

export default function MessagesContextProvider({ children }: { children: ReactNode }) {
  const { data: liveData } = gqlSubscription<string, 'getLiveMessages'>({
    gql: USER_QUERIES.GET_LIVE_MESSAGES,
  });

  const [filteredResponse, setFilteredResponse] = useState<IGQLResponses<any>[] | undefined>(undefined);

  useEffect(() => {
    if (liveData && liveData.getLiveMessages) {
      let dataFiltered = liveData.getLiveMessages.data;
      if (liveData.getLiveMessages.data) dataFiltered = JSON.parse(liveData.getLiveMessages.data);

      if (liveData && liveData.getLiveMessages) {
        if (liveData.getLiveMessages.success) {
          toast.success(liveData.getLiveMessages.message);
        } else {
          toast.error(liveData.getLiveMessages.message);
        }
      }

      setFilteredResponse((prev) => {
        return prev
          ? [...prev, { ...liveData.getLiveMessages, data: dataFiltered }]
          : [{ ...liveData.getLiveMessages, data: dataFiltered }];
      });
    }
  }, [liveData]);

  return (
    <MessagesContext.Provider value={{ messages: { messagesData: filteredResponse, setFilteredResponse } }}>
      {children}
    </MessagesContext.Provider>
  );
}

export const useMessagesContext = () => useContext(MessagesContext);

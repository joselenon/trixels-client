import { useEffect } from 'react';

import { useMessagesContext } from '../contexts/MessagesContext';
import { IGQLResponses } from '../interfaces/IGQLResponses';

interface IUseGetMessages {
  messagesData: IGQLResponses<any>[] | undefined;
  raffleCreationMessages: IGQLResponses<any>[];
  setRaffleCreationMessages: React.Dispatch<React.SetStateAction<IGQLResponses<any>[]>>;
  walletVerificationMessages: IGQLResponses<any>[];
  setWalletVerificationMessages: React.Dispatch<React.SetStateAction<IGQLResponses<any>[]>>;
}

export default function useGetMessages(): IUseGetMessages {
  const { messages } = useMessagesContext();
  const {
    messagesData,
    setFilteredResponse,
    raffleCreationMessages,
    setRaffleCreationMessages,
    walletVerificationMessages,
    setWalletVerificationMessages,
  } = messages;

  const removeMessage = (id: string) => {
    if (setFilteredResponse) {
      setFilteredResponse((prev) => prev?.filter((message) => message.request !== id));
    }
  };

  useEffect(() => {
    if (messagesData) {
      const createRaffleMessages = messagesData.filter((m) => m.type === 'CREATE_RAFFLE');
      if (createRaffleMessages.length > 0) setRaffleCreationMessages(createRaffleMessages);

      const walletVerificationMessagesFound = messagesData.filter((m) => m.type === 'WALLET_VERIFICATION');
      if (walletVerificationMessagesFound.length > 0) setWalletVerificationMessages(walletVerificationMessagesFound);

      createRaffleMessages.forEach((raffle) => removeMessage(raffle.request));
    }
  }, [messagesData, setRaffleCreationMessages, setWalletVerificationMessages]);

  return {
    messagesData,
    raffleCreationMessages,
    setRaffleCreationMessages,
    walletVerificationMessages,
    setWalletVerificationMessages,
  };
}

import { useMessagesContext } from '../contexts/MessagesContext';
import { IGQLResponses } from '../interfaces/IGQLResponses';

interface IUseGetMessages {
  messagesData: IGQLResponses<any>[] | undefined;
  setFilteredResponse: React.Dispatch<React.SetStateAction<IGQLResponses<any>[] | undefined>> | undefined;
}

export default function useGetMessages(): IUseGetMessages {
  const { messages } = useMessagesContext();
  const { messagesData, setFilteredResponse } = messages;

  return { messagesData, setFilteredResponse };
}

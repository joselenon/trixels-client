import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import CurrencyIconAndAmountMEDIUM from '../../components/CurrencyIconAndAmount';
import TrixelsButton from '../../components/TrixelsButton';
import { ROUTES } from '../../config/constants/CLIENT_ROUTES';
import { useAvailableItemsContext } from '../../contexts/ItemsAvailableContext';
import { useRaffleCreationContext } from '../../contexts/RaffleCreationContext';
import { useRafflesContext } from '../../contexts/RafflesContext';
import { useScreenConfig } from '../../contexts/ScreenConfigContext';
import useCreateRaffle from '../../hooks/useCreateRaffle';
import useGetMessages from '../../hooks/useGetMessages';
import useRequireLogin from '../../hooks/useRequireLogin';
import { Body } from '../../styles/GlobalStyles';
import { GetRaffleDetails } from '../../utils/RaffleCalcs';
import BuyLimit from './BuyLimit';
import Privacy from './Privacy';
import PrivacySettings from './PrivacySettings';
import TotalTickets from './TotalTickets';
import Winners from './Winners';

const RaffleCreationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
`;

const PageTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const Margin = styled.div`
  width: 100%;
  display: flex;
  box-shadow: 0px 0px 0px 2px var(--default-blue);
`;

const SubHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const PreferencesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PricesContainer = styled.div<{ $screenWidth: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
`;

const TicketsAmountAndPrices = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
`;

const TextValueHorizontal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CreateRaffleButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export type THandleItemClickFn = ({
  winnerIndex,
  itemId,
  type,
}: {
  winnerIndex: number;
  type: 'add' | 'remove';
  itemId: string;
}) => void;

export default function RaffleCreation() {
  const navigate = useNavigate();
  const requireLoginFn = useRequireLogin();
  const handleCreateRaffle = useCreateRaffle();
  const { width } = useScreenConfig();
  const { messagesData, raffleCreationMessages, setRaffleCreationMessages } = useGetMessages();

  const { activeRaffles } = useRafflesContext();
  const availableItems = useAvailableItemsContext();

  const { raffleConfig } = useRaffleCreationContext();

  const [isRaffleCreationProcessing, setIsRaffleCreationProcessing] = useState({
    isProcessing: false,
    gameId: undefined,
  });

  const isRafflePayloadValid = () => {
    if (Object.keys(raffleConfig.prizes).length <= 0) {
      toast.error('You must select a prize');
      return false;
    }

    return true;
  };

  const toggleCreateRaffle = async () => {
    try {
      if (!requireLoginFn()) return;
      if (!isRafflePayloadValid()) return;

      setIsRaffleCreationProcessing((prev) => {
        return { ...prev, isProcessing: true };
      });

      await handleCreateRaffle(raffleConfig);
    } catch (err) {
      setIsRaffleCreationProcessing((prev) => {
        return { ...prev, isProcessing: false };
      });
    }
  };

  useEffect(() => {
    if (raffleCreationMessages) {
      raffleCreationMessages.forEach((message) => {
        const { data, success, request } = message;

        if (request === raffleConfig.request) {
          setRaffleCreationMessages(() => raffleCreationMessages.filter((m) => m !== message));
          setIsRaffleCreationProcessing(() => {
            return { gameId: data.gameId, isProcessing: false };
          });
        }

        if (!success) {
          setIsRaffleCreationProcessing(() => {
            return { gameId: undefined, isProcessing: false };
          });
        }

        setRaffleCreationMessages(() => raffleCreationMessages.filter((m) => m !== message));
      });
    }
  }, [messagesData]);

  useEffect(() => {
    if (activeRaffles && isRaffleCreationProcessing.gameId) {
      const findRaffleCreated = activeRaffles.find((raffle) => raffle.gameId === isRaffleCreationProcessing.gameId);

      if (findRaffleCreated) {
        navigate(`${ROUTES.RAFFLE}/${isRaffleCreationProcessing.gameId}`);
      }
    }
  }, [activeRaffles, isRaffleCreationProcessing]);

  return (
    <Body>
      <RaffleCreationContainer>
        <PageTitle>
          <Margin />
          <h3>Create raffle</h3>
          <Margin />
        </PageTitle>

        <SubHeaderContainer>
          <div>
            <Link to={'/raffles'}>
              <TrixelsButton btnType="DEFAULT" label="BACK" />
            </Link>
          </div>

          <Privacy />
        </SubHeaderContainer>

        {raffleConfig.privacy.type === 'private' && <PrivacySettings />}

        <PreferencesContainer>
          <TicketsAmountAndPrices>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TotalTickets />

              <BuyLimit />
            </div>

            <PricesContainer $screenWidth={width}>
              <TextValueHorizontal>
                <h5>Raffle</h5>
                <CurrencyIconAndAmountMEDIUM
                  theme="default"
                  amount={availableItems ? GetRaffleDetails(raffleConfig, availableItems).prizesTotalValue : 0}
                />
              </TextValueHorizontal>

              <TextValueHorizontal>
                <h5>Ticket</h5>
                <CurrencyIconAndAmountMEDIUM
                  theme="default"
                  amount={availableItems ? GetRaffleDetails(raffleConfig, availableItems).ticketPrice : 0}
                />
              </TextValueHorizontal>
            </PricesContainer>
          </TicketsAmountAndPrices>
        </PreferencesContainer>

        <Winners />

        <CreateRaffleButtonContainer>
          <div>
            <TrixelsButton
              btnType={'CTA'}
              isPending={isRaffleCreationProcessing.isProcessing}
              label={`Create Raffle ${
                availableItems ? GetRaffleDetails(raffleConfig, availableItems).raffleOwnerCost : 0
              }`}
              attributes={{ onClick: () => toggleCreateRaffle() }}
            />
          </div>
        </CreateRaffleButtonContainer>
      </RaffleCreationContainer>
    </Body>
  );
}

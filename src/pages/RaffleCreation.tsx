import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import CurrencyIconAndAmountMEDIUM from '../components/CurrencyIconAndAmount';
import PrivacyConfigElement from '../components/Games/Raffles/RaffleCreation/PrivacyModeButtons';
import PrivacySettings from '../components/Games/Raffles/RaffleCreation/PrivacySettings';
import SelectPrizesElement from '../components/Games/Raffles/RaffleCreation/SelectPrizesElement';
import TrixelsButton from '../components/TrixelsButton';
import { ROUTES } from '../config/constants/CLIENT_ROUTES';
import { useAvailableItemsContext } from '../contexts/ItemsAvailableContext';
import { useScreenConfig } from '../contexts/ScreenConfigContext';
import useCreateRaffle from '../hooks/useCreateRaffle';
import useGetMessages from '../hooks/useGetMessages';
import { IRaffleCreationPayload } from '../interfaces/IRaffleCreation';
import { Body } from '../styles/GlobalStyles';
import RaffleCalcs from '../utils/RaffleCalcs';

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

const TicketsAmountContainer = styled.div`
  display: flex;
  gap: 0.5rem;
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

export type THandleItemClickFn = (itemId: string, type: 'add' | 'remove') => void;

export default function RaffleCreation() {
  const navigate = useNavigate();
  const handleCreateRaffle = useCreateRaffle();
  const { width } = useScreenConfig();
  const availableItems = useAvailableItemsContext();
  const { messagesData, setFilteredResponse } = useGetMessages();

  const [isRaffleCreationProcessing, setIsRaffleCreationProcessing] = useState(false);
  const [raffleConfig, setRaffleConfig] = useState<IRaffleCreationPayload>({
    totalTickets: 10,
    discountPercentage: 0,
    privacy: { mode: 'public', type: 'public' },
    prizes: {},
    description: 'This is a fun raffle!',
  });
  const [raffleDetails, setRaffleDetails] = useState({ prizesTotalValue: 0, ticketPrice: 0, raffleOwnerCost: 0 });

  const { totalTickets, prizes, discountPercentage } = raffleConfig;
  const { prizesTotalValue, raffleOwnerCost, ticketPrice } = raffleDetails;

  useEffect(() => {
    if (availableItems) {
      const { prizesTotalValue, ticketPrice, raffleOwnerCost } = new RaffleCalcs(availableItems).getRaffleDetails(
        raffleConfig,
      );

      setRaffleDetails({ prizesTotalValue, ticketPrice, raffleOwnerCost });
    }
  }, [prizes, availableItems, discountPercentage]);

  const handleChangeTicketAmount = (amount: number) => {
    setRaffleConfig((prevConfig) => ({ ...prevConfig, totalTickets: amount }));
  };

  const isRafflePayloadValid = () => {
    if (Object.keys(raffleConfig.prizes).length <= 0) {
      toast.error('You must select a prize');
      return false;
    }

    return true;
  };

  const handleCreateRaffleButtonClick = async () => {
    if (isRaffleCreationProcessing) return;

    if (!isRafflePayloadValid()) return;

    setIsRaffleCreationProcessing(true);
    const res = await handleCreateRaffle(raffleConfig);
    if (!res) setIsRaffleCreationProcessing(false);
  };

  useEffect(() => {
    if (messagesData) {
      const createRaffleMessages = messagesData.filter((message) => message.type === 'CREATE_RAFFLE');

      createRaffleMessages.forEach((message) => {
        const { data, success } = message;
        setIsRaffleCreationProcessing(false);

        if (success && data) {
          setFilteredResponse && setFilteredResponse(() => messagesData.filter((m) => m !== message));
          return navigate(`${ROUTES.RAFFLE}/${data.gameId}`);
        }

        setFilteredResponse && setFilteredResponse(() => messagesData.filter((m) => m !== message));
      });
    }
  }, [messagesData]);

  const { privacy } = raffleConfig;

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

          <PrivacyConfigElement raffleConfig={raffleConfig} setRaffleConfig={setRaffleConfig} />
        </SubHeaderContainer>

        <PreferencesContainer>
          <TicketsAmountAndPrices>
            <TicketsAmountContainer>
              <h4>Tickets amount</h4>
              <div style={{ display: 'flex' }}>
                <TrixelsButton
                  btnType={totalTickets === 5 ? 'BLUE' : 'DEFAULT'}
                  label="5"
                  attributes={{ onClick: () => handleChangeTicketAmount(5) }}
                />
                <TrixelsButton
                  btnType={totalTickets === 10 ? 'BLUE' : 'DEFAULT'}
                  label="10"
                  attributes={{ onClick: () => handleChangeTicketAmount(10) }}
                />
                <TrixelsButton
                  btnType={totalTickets === 20 ? 'BLUE' : 'DEFAULT'}
                  label="20"
                  attributes={{ onClick: () => handleChangeTicketAmount(20) }}
                />
              </div>
            </TicketsAmountContainer>

            <PricesContainer $screenWidth={width}>
              <TextValueHorizontal>
                <h5>Raffle</h5>
                <CurrencyIconAndAmountMEDIUM amount={prizesTotalValue} />
              </TextValueHorizontal>

              <TextValueHorizontal>
                <h5>Ticket</h5>
                <CurrencyIconAndAmountMEDIUM amount={ticketPrice} />
              </TextValueHorizontal>
            </PricesContainer>
          </TicketsAmountAndPrices>
        </PreferencesContainer>

        {privacy.type === 'private' && (
          <PrivacySettings raffleConfig={raffleConfig} setRaffleConfig={setRaffleConfig} />
        )}

        <SelectPrizesElement raffleConfig={raffleConfig} setRaffleConfig={setRaffleConfig} />

        <div style={{ display: 'flex' }}>
          <div>
            <TrixelsButton
              btnType={'CTA'}
              isPending={isRaffleCreationProcessing}
              label={`Create Raffle ${raffleOwnerCost}`}
              attributes={{ onClick: () => handleCreateRaffleButtonClick() }}
            />
          </div>
        </div>
      </RaffleCreationContainer>
    </Body>
  );
}

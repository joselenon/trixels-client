import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import useGetUserTransactions, { IGetUserTransactionsPayload } from '../../hooks/useGetUserTransactions';
import { ITransactionToFrontendBase, TTransactionsToFrontend } from '../../interfaces/ITransaction';
import { DateSpan } from '../../styles/GlobalStyles';
import CurrencyIconAndAmount from '../CurrencyIconAndAmount';
import PageSelectButtonsCustomToggler from '../TrixelsButton/PageSelectButtonsCustomToggler';

const TransactionsContainer = styled.div``;

const TransactionItem = styled.div<{ $type: ITransactionToFrontendBase['type'] }>`
  height: 60px;
  background-color: var(--default-lightgrey);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 2px solid
    ${({ $type }) => {
      if ($type === 'deposit') return `var(--default-green)`;
      if ($type === 'withdraw') return `var(--default-red)`;
      if ($type === 'codeRedeem') return `var(--default-black)`;
    }};

  h4 {
    color: var(--default-black);
  }
`;

const TransactionsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GhostTransactionItem = styled.div`
  height: 60px;
  background-color: var(--default-middlegrey);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  opacity: 0.5;
  animation: pulse 0.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      background-color: var(--default-middlegrey);
      opacity: 0.4;
    }
    50% {
      background-color: var(--default-middlegrey);
      opacity: 0.7;
    }
    100% {
      background-color: var(--default-middlegrey);
      opacity: 0.4;
    }
  }
`;

const FillTransactionItem = styled.div`
  height: 60px;
  background-color: var(--default-middlegrey);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  opacity: 0.5;
`;

export default function Transactions() {
  const getUserTransactions = useGetUserTransactions();

  const [page, setPage] = useState(1);
  const [paginationConfig, setPaginationConfig] = useState<IGetUserTransactionsPayload>({
    forward: true,
    startAfterDocTimestamp: undefined,
  });
  const [isPending, setIsPending] = useState(false);
  const [transactionsResponse, setTransactions] = useState<TTransactionsToFrontend | null>(null);

  const handleGetTransactions = async (payload: IGetUserTransactionsPayload) => {
    setIsPending(true);
    setTransactions(null);

    const res = await getUserTransactions(payload);
    if (res && res.data) {
      setTransactions(res.data);
    }
    setIsPending(false);
  };

  useEffect(() => {
    handleGetTransactions(paginationConfig);
  }, [paginationConfig]);

  const transactionItems = transactionsResponse
    ? transactionsResponse.transactions.map((transaction, index) => (
        <TransactionItem key={index} $type={transaction.type}>
          <div>
            <div>
              <h4>{transaction.type.toUpperCase()}</h4>
            </div>
            <DateSpan>{new Date(transaction.createdAt).toLocaleString()}</DateSpan>
          </div>
          <div>
            <CurrencyIconAndAmount amount={transaction.value} theme="default" />
          </div>
        </TransactionItem>
      ))
    : [];

  // Preencher com GhostTransactionItem até ter 10 itens
  const fillTransactionsItems = Array.from({ length: 10 - transactionItems.length }).map((_, i) => (
    <FillTransactionItem key={i + transactionItems.length} />
  ));

  const transactionsItemsFullfilled = [...transactionItems, ...fillTransactionsItems];

  const ghostItems = Array.from({ length: 10 - transactionItems.length }).map((_, i) => (
    <GhostTransactionItem key={i + transactionItems.length} />
  ));

  return (
    <TransactionsContainer>
      <TransactionsListContainer>
        {transactionsResponse && transactionsItemsFullfilled}
        {isPending && ghostItems}
      </TransactionsListContainer>

      <PageSelectButtonsCustomToggler
        hasPrevious={page > 1}
        hasMore={
          (paginationConfig.forward && transactionsResponse?.hasMore) || !paginationConfig.forward ? true : false
        }
        togglePrevious={() =>
          setPaginationConfig((prev) => {
            if (!transactionsResponse) return prev;
            if (page === 1) return prev;
            setPage((prev) => prev - 1);
            return { forward: false, startAfterDocTimestamp: transactionsResponse.transactions[0].createdAt };
          })
        }
        toggleNext={() =>
          setPaginationConfig((prev) => {
            if (!transactionsResponse) return prev;
            if (paginationConfig.forward && !transactionsResponse.hasMore) return prev;
            setPage((prev) => prev + 1);
            return {
              forward: true,
              startAfterDocTimestamp:
                transactionsResponse.transactions[transactionsResponse.transactions.length - 1].createdAt,
            };
          })
        }
      />
    </TransactionsContainer>
  );
}

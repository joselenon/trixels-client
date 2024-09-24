import React from 'react';

import { useRaffleCreationContext } from '../../contexts/RaffleCreationContext';
import Winner from './Winner';

export default function Winners() {
  const { raffleConfig } = useRaffleCreationContext();

  return (
    <div>
      {raffleConfig.prizes.map((_, winnerIndex: number) => {
        return <Winner key={winnerIndex} winnerIndex={winnerIndex} />;
      })}
    </div>
  );
}

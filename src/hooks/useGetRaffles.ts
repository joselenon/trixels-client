import React from 'react';

import { useRafflesContext } from '../contexts/RafflesContext';

export default function useGetRaffles() {
  const { updatedRaffles } = useRafflesContext();

  return { updatedRaffles };
}

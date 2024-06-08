import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AvailableItemsContextProvider } from '../contexts/ItemsAvailableContext';
import Affiliates from '../pages/Affiliates';
import Home from '../pages/Home';
import RaffleCreation from '../pages/RaffleCreation';
import Raffles from '../pages/Raffles';
import UserProfile from '../pages/UserProfile';
import ViewRaffle from '../pages/ViewRaffle';

export type TParams = 'username';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AvailableItemsContextProvider>
            <Home />
          </AvailableItemsContextProvider>
        }
      />
      <Route
        path="/raffles"
        element={
          <AvailableItemsContextProvider>
            <Raffles />
          </AvailableItemsContextProvider>
        }
      />
      <Route
        path="/raffles/create"
        element={
          <AvailableItemsContextProvider>
            <RaffleCreation />
          </AvailableItemsContextProvider>
        }
      />
      <Route
        path="/raffle/:gameId"
        element={
          <AvailableItemsContextProvider>
            <ViewRaffle />
          </AvailableItemsContextProvider>
        }
      />
      <Route path="/profile/:username" element={<UserProfile />} />
      <Route path="/affiliates" element={<Affiliates />} />
    </Routes>
  );
}

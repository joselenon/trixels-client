import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Affiliates from '../pages/Affiliates';
import CashoutsApprovals from '../pages/CashoutsApprovals';
import Home from '../pages/Home';
import RaffleCreation from '../pages/RaffleCreation';
import Raffles from '../pages/Raffles';
import UserProfile from '../pages/UserProfile';
import ViewRaffle from '../pages/ViewRaffle';
import AvailableItemsContextProvider from '../contexts/ItemsAvailableContext';
import GoogleAuth from '../pages/GoogleAuth';

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
      <Route path="/cashoutsapprovals" element={<CashoutsApprovals />} />
      <Route path="/googleauth" element={<GoogleAuth />} />
    </Routes>
  );
}

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AvailableItemsContextProvider from '../contexts/ItemsAvailableContext';
import { RaffleCreationContextProvider } from '../contexts/RaffleCreationContext';
import RafflesContextProvider from '../contexts/RafflesContext';
import { ScreenConfigProvider } from '../contexts/ScreenConfigContext';
import Affiliates from '../pages/Affiliates';
import CashoutsApprovals from '../pages/CashoutsApprovals';
import GoogleAuth from '../pages/GoogleAuth';
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
          <RafflesContextProvider>
            <ScreenConfigProvider>
              <AvailableItemsContextProvider>
                <Home />
              </AvailableItemsContextProvider>
            </ScreenConfigProvider>
          </RafflesContextProvider>
        }
      />
      <Route
        path="/raffles"
        element={
          <RafflesContextProvider>
            <AvailableItemsContextProvider>
              <Raffles />
            </AvailableItemsContextProvider>
          </RafflesContextProvider>
        }
      />
      <Route
        path="/raffles/create"
        element={
          <RafflesContextProvider>
            <AvailableItemsContextProvider>
              <RaffleCreationContextProvider>
                <RaffleCreation />
              </RaffleCreationContextProvider>
            </AvailableItemsContextProvider>
          </RafflesContextProvider>
        }
      />
      <Route
        path="/raffle/:gameId"
        element={
          <RafflesContextProvider>
            <ScreenConfigProvider>
              <AvailableItemsContextProvider>
                <ViewRaffle />
              </AvailableItemsContextProvider>
            </ScreenConfigProvider>
          </RafflesContextProvider>
        }
      />
      <Route
        path="/profile/:username"
        element={
          <ScreenConfigProvider>
            <UserProfile />
          </ScreenConfigProvider>
        }
      />
      <Route path="/affiliates" element={<Affiliates />} />
      <Route path="/cashoutsapprovals" element={<CashoutsApprovals />} />
      <Route path="/googleauth" element={<GoogleAuth />} />
    </Routes>
  );
}

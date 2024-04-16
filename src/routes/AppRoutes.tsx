import React from 'react';
import { Route, Routes } from 'react-router-dom';

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
      <Route path="/" element={<Home />} />
      <Route path="/raffles" element={<Raffles />} />
      <Route path="/raffles/create" element={<RaffleCreation />} />
      <Route path="/raffle/:gameId" element={<ViewRaffle />} />
      <Route path="/profile/:username" element={<UserProfile />} />
      <Route path="/affiliates" element={<Affiliates />} />
    </Routes>
  );
}

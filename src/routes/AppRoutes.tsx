import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import UserProfile from '../pages/UserProfile';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:username" element={<UserProfile />} />
    </Routes>
  );
}

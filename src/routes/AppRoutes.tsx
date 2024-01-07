import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Crafting from '../pages/Crafting';
import Home from '../pages/Home';
import LR from '../pages/LR';
import Market from '../pages/Market';
import MyTimers from '../pages/MyTimers';
import Trading from '../pages/Trading';
import Tricks from '../pages/Tricks';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mytimers" element={<MyTimers />} />
      <Route path="/market" element={<Market />} />
      <Route path="/tricks" element={<Tricks />} />
      <Route path="/lr" element={<LR />} />
      <Route path="/tricks/trading" element={<Trading />} />
      <Route path="/tricks/crafting" element={<Crafting />} />
    </Routes>
  );
}

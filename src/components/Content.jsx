import React from 'react';

import Home from '../pages/Home';
import Cart from '../pages/Cart';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';

export default function Content({ searchValue }) {
  return (
    <div className="content">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

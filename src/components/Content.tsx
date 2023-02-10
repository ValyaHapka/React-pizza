import React from 'react';

import Home from '../pages/Home';
import Cart from '../pages/Cart';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import FullPizza from '../pages/FullPizza';

export default function Content() {
  return (
    <div className="content">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

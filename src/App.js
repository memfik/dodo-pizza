import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import './scss/app.scss';
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

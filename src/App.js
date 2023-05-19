import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import './scss/app.scss';
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    fetch('https://646778a6ba7110b663b9cda8.mockapi.io/pizzas')
      .then((res) => {
        return res.json();
      })
      .then((pizzas) => {
        setItems(pizzas);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

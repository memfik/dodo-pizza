import React from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
// import pizzas from './assets/pizzas.json';
import './scss/app.scss';
// https://646778a6ba7110b663b9cda8.mockapi.io/pizzas
function App() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch('https://646778a6ba7110b663b9cda8.mockapi.io/pizzas')
      .then((res) => {
        return res.json();
      })
      .then((pizzas) => {
        setItems(pizzas);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((pizza) => {
              return <PizzaBlock key={pizza.id} {...pizza} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

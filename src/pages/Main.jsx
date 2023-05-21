import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';
export const Main = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeSort, setActiveSort] = React.useState({
    name: 'популярности (убыванию)',
    sortProperty: 'rating',
  });
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const sortBy = activeSort.sortProperty.replace('-', '');
  const category = activeCategory > 0 ? `&category=${activeCategory}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';
    fetch(
      `https://646778a6ba7110b663b9cda8.mockapi.io/pizzas?page=1&limit=8${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((pizzas) => {
        setItems(pizzas);
        setIsLoading(false);
      });
    // window.scrollTo(0, 0); скрол вверх
  }, [activeCategory, activeSort, searchValue, currentPage]);

  const pizzaItems = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategory} onClickCategory={(index) => setActiveCategory(index)} />
        <Sort value={activeSort} onClickSort={(index) => setActiveSort(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : pizzaItems}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

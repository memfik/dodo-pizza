import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import axios from 'axios';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
export const Main = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const activeSort = sort;
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // const [activeSort, setActiveSort] = React.useState({
  //   name: 'популярности (убыванию)',
  //   sortProperty: 'rating',
  // });
  const sortBy = activeSort.sortProperty.replace('-', '');
  const category = categoryId > 0 ? `&category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';
  const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://646778a6ba7110b663b9cda8.mockapi.io/pizzas?page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
    // window.scrollTo(0, 0); скрол вверх
  }, [categoryId, activeSort, searchValue, currentPage]);

  const pizzaItems = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : pizzaItems}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

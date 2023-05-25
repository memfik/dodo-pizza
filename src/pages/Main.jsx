import React from 'react';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import queryString from 'qs';
import PizzaBlock from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import { setItems } from '../redux/slices/pizzaSlice';
import axios from 'axios';

export const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items } = useSelector((state) => state.pizza);
  const activeSort = sort;
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const { searchValue } = React.useContext(SearchContext);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchPizzas = async () => {
    const sortBy = activeSort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const order = activeSort.sortProperty.includes('-') ? 'asc' : 'desc';
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `https://646778a6ba7110b663b9cda8.mockapi.io/pizzas?page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}${search}`,
      );
      dispatch(setItems(data));
    } catch (error) {
      console.log('ERROR', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
    // window.scrollTo(0, 0); скрол вверх
  }, [categoryId, activeSort, searchValue, currentPage]);
  React.useEffect(() => {
    if (window.location.search) {
      const params = queryString.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      console.log(dispatch(setFilters({ ...params, sort })));
      console.log(params);
      isSearch.current = true;
    }
  }, []);
  React.useEffect(() => {
    if (isMounted.current) {
      const QueryString = queryString.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${QueryString}`);
    }
    isMounted.current = true;
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

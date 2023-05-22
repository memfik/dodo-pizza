import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { decrement, increment } from '../redux/slices/filterSlice';

function Categories({ value, onClickCategory }) {
  const categories = ['Все', , 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  // const count = useSelector((state) => state.filter.value);
  // const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              onClick={() => onClickCategory(index)}
              key={index}
              className={value === index ? 'active' : ''}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Categories;

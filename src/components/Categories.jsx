import React from 'react';
function Categories({ value, onClickCategory }) {
  const categories = ['Все', 'Мясные', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые'];
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

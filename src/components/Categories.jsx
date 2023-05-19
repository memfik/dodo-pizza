import React from 'react';
function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const onClickCategory = (index) => {
    setActiveCategory(index);
  };
  const categories = ['Все', 'Мясные', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((categorie, index) => {
          return (
            <li
              onClick={() => onClickCategory(index)}
              key={index}
              className={activeCategory === index ? 'active' : ''}>
              {categorie}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Categories;

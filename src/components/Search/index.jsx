import React from 'react';
import s from './Search.module.scss';
import { SearchContext } from '../../App';
export const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  return (
    <div>
      <input
        className={s.root}
        placeholder="Найти пиццу"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {searchValue && (
        <button className={s.clear} onClick={() => setSearchValue('')}>
          🗑️
        </button>
      )}
    </div>
  );
};

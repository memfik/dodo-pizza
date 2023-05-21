import React from 'react';
import s from './Search.module.scss';
export const Search = ({ searchValue, setSearchValue }) => {
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

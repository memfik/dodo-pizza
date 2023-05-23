import React from 'react';
import s from './Search.module.scss';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';

export const Search = () => {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef(null);

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
      console.log('Debounced: ', str);
    }, 300),
    [],
  );

  const onChangeInput = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    updateSearchValue(inputValue);
  };

  const onClickClear = () => {
    setValue('');
    setSearchValue('');
    inputRef.current.focus();
  };

  return (
    <div>
      <input
        className={s.root}
        placeholder="Найти пиццу"
        value={value}
        onChange={onChangeInput}
        ref={inputRef}
      />

      {value && (
        <button className={s.clear} onClick={() => onClickClear()}>
          🗑️
        </button>
      )}
    </div>
  );
};

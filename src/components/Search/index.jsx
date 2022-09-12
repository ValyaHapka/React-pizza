import React from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';

export default function Search() {
  const [localValue, setLocalValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  function closeClick() {
    setSearchValue('');
    setLocalValue('');
    inputRef.current.focus();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchDebounce = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 300),
    [],
  );

  function updateValues(event) {
    setLocalValue(event.target.value);
    searchDebounce(event.target.value);
  }

  return (
    <div className={styles.search}>
      <svg
        className={styles.search__icon}
        enableBackground="new 0 0 32 32"
        id="Editable-line"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        placeholder="Поиск пиццы"
        className={styles.search__input}
        onChange={updateValues}
      />
      {localValue && (
        <svg
          onClick={closeClick}
          className={styles.search__delete}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
}

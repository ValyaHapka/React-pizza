import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { setSortType, setSortOrder } from '../redux/slices/filterSlice';
import { RootState, useAppDispatch } from '../redux/store';

interface SortTypes {
  name: string;
  sort: string;
}
interface SortProps {
  sortOrder: boolean;
}

type OutsideClick = MouseEvent & {
  path: Node[];
};
const Sort: React.FC<SortProps> = ({ sortOrder }) => {
  const [sortPopup, setSortPopup] = useState(false);
  const sortType = useSelector((state: RootState) => state.filterSlice.sort);
  const dispatch = useAppDispatch();

  const sortTypesBy: SortTypes[] = [
    { name: 'популярности', sort: 'rating' },
    { name: 'цене', sort: 'price' },
    { name: 'алфавиту', sort: 'title' },
  ];

  function sortClick(type: SortTypes) {
    dispatch(setSortType(type));
    setSortPopup(false);
  }

  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const _event = e as OutsideClick;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setSortPopup(false);
      }
    };
    document.body.addEventListener('click', handleOutsideClick);
    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        {sortOrder ? (
          <svg
            onClick={() => dispatch(setSortOrder())}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        ) : (
          <svg
            onClick={() => dispatch(setSortOrder())}
            height="7px"
            version="1.1"
            viewBox="0 0 10 7"
            width="10px"
            xmlns="http://www.w3.org/2000/svg">
            <title />
            <desc />
            <defs />
            <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
              <g fill="#000000" id="Core" transform="translate(-469.000000, -9.000000)">
                <g id="arrow-drop-down" transform="translate(469.000000, 9.500000)">
                  <path d="M0,0 L5,5 L10,0 L0,0 Z" id="Shape" />
                </g>
              </g>
            </g>
          </svg>
        )}
        <b>По:</b>
        <span onClick={() => setSortPopup(!sortPopup)}>{sortType.name}</span>
      </div>
      {sortPopup && (
        <div className="sort__popup">
          <ul>
            {sortTypesBy.map((type) => (
              <li
                key={type.name}
                onClick={() => sortClick(type)}
                className={sortType.sort === type.sort ? 'active' : ''}>
                {type.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Sort;

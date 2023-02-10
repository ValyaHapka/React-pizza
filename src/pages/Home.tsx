import React, { useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { setCategoryID, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas, PizzaQuery } from '../redux/slices/pizzaSlice';
import NotFound from './NotFound';
import { RootState, useAppDispatch } from '../redux/store';

export default function Home() {
  const searchValue = useSelector((state) => (state as RootState).filterSlice.searchValue);

  const { categoryID, sort, sortOrderAsc, currentPage } = useSelector(
    (state) => (state as RootState).filterSlice,
  );
  const { items, status } = useSelector((state) => (state as RootState).pizzaSlice);

  const dispatch = useAppDispatch();

  const categoryQuery: string = categoryID !== 0 ? `category=${categoryID}` : '';
  const sortQuery: string = sort.sort;
  const order: string = sortOrderAsc ? 'asc' : 'desc';

  useEffect(() => {
    const fetchingData = async () => {
      dispatch(
        fetchPizzas({
          categoryQuery,
          sortQuery,
          order,
          currentPage,
        }),
      );
    };
    fetchingData();

    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryQuery, sortQuery, order, currentPage]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeCategory = React.useCallback((id: number) => dispatch(setCategoryID(id)), []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryIndex={categoryID} onClickCategory={onChangeCategory} />
        <Sort sortOrder={sortOrderAsc} sort={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loaded' ? (
          items
            .filter((pizza: PizzaQuery) =>
              pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
            )
            .map((pizza: PizzaQuery) => <PizzaBlock {...pizza} key={pizza.id} />)
        ) : status === 'loading' ? (
          [...new Array(4)].map((_, i) => <Skeleton key={i} />)
        ) : (
          <NotFound />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number: number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
}

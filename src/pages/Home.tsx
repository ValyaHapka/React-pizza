import React, { useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryID, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import NotFound from './NotFound';

export default function Home() {
  const searchValue = useSelector((state) => state.filterSlice.searchValue);

  const { categoryID, sort, sortOrderAsc, currentPage } = useSelector((state) => state.filterSlice);
  const { items, status } = useSelector((state) => state.pizzaSlice);

  const dispatch = useDispatch();

  const categoryQuery = categoryID !== 0 ? `category=${categoryID}` : '';
  const sortQuery = sort.sort;
  const order = sortOrderAsc ? 'asc' : 'desc';

  useEffect(() => {
    const fetchingData = async () => {
      dispatch(
        // @ts-ignore
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

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryIndex={categoryID}
          onClickCategory={(id: number) => dispatch(setCategoryID(id))}
        />
        <Sort sortOrder={sortOrderAsc} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loaded' ? (
          items
            .filter((pizza: any) => pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((pizza: any) => <PizzaBlock {...pizza} key={pizza.id} />)
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

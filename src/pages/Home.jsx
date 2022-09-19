import React, { useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryID, setSortType, setCurrentPage } from '../redux/slices/filterSlice';
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
          onClickCategory={(id) => dispatch(setCategoryID(id))}
        />
        <Sort onClickSort={(id) => dispatch(setSortType(id))} sortOrder={sortOrderAsc} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loaded' ? (
          items
            .filter((pizza) => pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)
        ) : status === 'loading' ? (
          [...new Array(4)].map((_, i) => <Skeleton key={i} />)
        ) : (
          <NotFound />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryID, setSortType, setCurrentPage } from '../redux/slices/filterSlice';

export default function Home() {
  const { searchValue } = React.useContext(SearchContext);

  const { categoryID, sort, sortOrderAsc, currentPage } = useSelector((state) => state.filterSlice);
  // const sortType = useSelector((state) => state.filterSlice.sort);
  // const sortOrder = useSelector((state) => state.filterSlice.sortOrderAsc);
  // const currentPage = useSelector((state) => state.filterSlice.currentPage);

  const dispatch = useDispatch();

  const [pizzas, setPizzas] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const categoryQuery = categoryID !== 0 ? `category=${categoryID}` : '';
  const sortQuery = sort.sort;
  const order = sortOrderAsc ? 'asc' : 'desc';

  useEffect(() => {
    setIsLoaded(false);

    axios
      .get(
        `https://631646935b85ba9b11f404ca.mockapi.io/pizzas?page=${currentPage}&limit=4&${categoryQuery}&sortBy=${sortQuery}&order=${order}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoaded(true);
      });
    window.scrollTo(0, 0);
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
        {isLoaded
          ? pizzas
              .filter((pizza) => pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)
          : [...new Array(4)].map((_, i) => <Skeleton key={i} />)}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
}

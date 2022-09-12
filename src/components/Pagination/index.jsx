import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

export default function Pagination({ currentPage, onChangePage }) {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      forcePage={currentPage - 1}
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

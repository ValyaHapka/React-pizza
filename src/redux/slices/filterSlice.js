import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryID: 0,
  sort: { name: 'популярности', sort: 'rating' },
  sortOrderAsc: true,
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryID(state, action) {
      state.categoryID = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setSortOrder(state) {
      state.sortOrderAsc = !state.sortOrderAsc;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryID, setSortType, setSortOrder, setCurrentPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISort {
  name: string;
  sort: string;
}

interface FilterSliceState {
  searchValue: string;
  categoryID: number;
  sort: ISort;
  sortOrderAsc: boolean;
  currentPage: number;
}

const initialState: FilterSliceState = {
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
    setCategoryID(state, action: PayloadAction<number>) {
      state.categoryID = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortType(state, action: PayloadAction<ISort>) {
      state.sort = action.payload;
    },
    setSortOrder(state) {
      state.sortOrderAsc = !state.sortOrderAsc;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryID, setSortType, setSortOrder, setCurrentPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;

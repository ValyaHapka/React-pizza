import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { categoryQuery, sortQuery, order, currentPage } = params;
  const query = await axios.get(
    `https://631646935b85ba9b11f404ca.mockapi.io/pizzas?page=${currentPage}&limit=4&${categoryQuery}&sortBy=${sortQuery}&order=${order}`,
  );
  return query.data;
});

const initialState = {
  items: [],
  status: '', // loading, loaded, error
};

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'loaded';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export const selectItemById = (id) => (state) => state.cartSlice.items.find((obj) => obj.id === id);

export default pizzaSlice.reducer;

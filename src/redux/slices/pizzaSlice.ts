import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface FetchParams {
  currentPage: number;
  categoryQuery: string;
  sortQuery: string;
  order: string;
}

export interface PizzaQuery {
  title: string;
  price: number;
  imageUrl: string;
  id: string;
  types: number[];
  sizes: number[];
}

export enum Status {
  EMPTY = '',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

interface PizzaState {
  status: '' | 'loading' | 'loaded' | 'error';
  items: Array<PizzaQuery>;
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchParams) => {
    const { categoryQuery, sortQuery, order, currentPage } = params;
    const query = await axios.get<PizzaQuery[]>(
      `https://631646935b85ba9b11f404ca.mockapi.io/pizzas?page=${currentPage}&limit=4&${categoryQuery}&sortBy=${sortQuery}&order=${order}`,
    );
    return query.data as PizzaQuery[];
  },
);

const initialState: PizzaState = {
  items: [],
  status: Status.EMPTY,
};

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Array<PizzaQuery>>) => {
      state.items = action.payload;
      state.status = Status.LOADED;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export const selectItemById = (id: string) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);

export default pizzaSlice.reducer;

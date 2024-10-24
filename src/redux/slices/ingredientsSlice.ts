import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  isLoading: boolean;
  ingredients: TIngredient[];
};

const initialState: TIngredientsState = {
  isLoading: false,
  ingredients: []
};

const slice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

export const {} = slice.actions;
export const { getIngredients, getLoading } = slice.selectors;
export default slice.reducer;

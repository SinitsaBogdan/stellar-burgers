import { createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

type TConstructorItemState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TConstructorItemState = {
  bun: null,
  ingredients: []
};

const slice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setBun(state, action) {
      state.bun = action.payload;
    },
    clear(state) {
      state.bun = null;
      state.ingredients = [];
    },
    setIngredients(state, action) {
      state.ingredients = action.payload;
    },
    setIngredient(state, action) {
      state.ingredients = [...state.ingredients, action.payload];
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getIngredients: (state) => state.ingredients
  }
});

export const { clear, setBun, setIngredients, setIngredient } = slice.actions;
export const { getBun, getIngredients } = slice.selectors;
export default slice.reducer;

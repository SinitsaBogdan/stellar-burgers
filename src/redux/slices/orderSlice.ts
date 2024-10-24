import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  isLoading: boolean;
  orderData: TOrder | null;
  orderRequest: boolean;
};

const initialState: TOrdersState = {
  isLoading: false,
  orderData: null,
  orderRequest: false
};

const slice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orderData = action.payload;
    }
  },
  selectors: {
    getIsLoading: (state) => state.isLoading,
    getOrderData: (state) => state.orderData,
    getOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderId.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrderId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload.orders[0];
      });
    builder
      .addCase(fetchCreateOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchCreateOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchCreateOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderData = action.payload.order;
      });
  }
});

export const fetchOrderId = createAsyncThunk(
  'order/getId',
  async (number: string) => await getOrderByNumberApi(Number(number))
);

export const fetchCreateOrder = createAsyncThunk(
  'order/create',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

export const { setOrderData } = slice.actions;
export const { getIsLoading, getOrderData, getOrderRequest } = slice.selectors;
export default slice.reducer;

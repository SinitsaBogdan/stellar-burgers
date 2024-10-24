import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type THistoryState = {
  isLoading: boolean;
  feeds: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  history: TOrder[];
};

const initialState: THistoryState = {
  isLoading: false,
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  history: []
};

const slice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  selectors: {
    getFeeds: (state) => state.feeds,
    getHistory: (state) => state.history,
    getFeedsOrders: (state) => state.feeds.orders,
    getFeedsTotal: (state) => state.feeds.total,
    getFeedsTotalToday: (state) => state.feeds.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload;
      });
    builder
      .addCase(fetchUserOrdersHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrdersHistory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUserOrdersHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.history = action.payload;
      });
  }
});

export const fetchFeeds = createAsyncThunk(
  'feed/getAll',
  async () => await getFeedsApi()
);

export const fetchUserOrdersHistory = createAsyncThunk(
  'feed/getUserHistory',
  async () => await getOrdersApi()
);

export const {} = slice.actions;
export const {
  getHistory,
  getFeedsOrders,
  getFeedsTotal,
  getFeedsTotalToday,
  getFeeds
} = slice.selectors;
export default slice.reducer;

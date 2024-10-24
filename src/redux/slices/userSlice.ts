import {
  getUserApi,
  loginUserApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  isAuth: boolean;
  user: TUser;
  error: string | undefined;
};

const initialState: TUserState = {
  isAuth: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getIsAuth: (state) => state.isAuth,
    getUser: (state) => state.user,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isAuth = false;
        state.error = '';
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isAuth = action.payload.success;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.user = action.payload.user;
        state.error = '';
      });
    builder
      .addCase(fetchUpdateUser.pending, (state) => {
        state.error = '';
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.error = String(action.error.message);
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = '';
      });
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.error = '';
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.error = String(action.error.message);
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.isAuth = action.payload.success;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.user = action.payload.user;
        state.error = '';
      });
    builder
      .addCase(fetchLogout.pending, (state) => {
        state.error = '';
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.error = String(action.error.message);
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isAuth = false;
        state.user = {
          email: '',
          name: ''
        };
        state.error = '';
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      });
    builder
      .addCase(fetchUserCheck.pending, (state) => {
        state.error = '';
      })
      .addCase(fetchUserCheck.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchUserCheck.fulfilled, (state, action) => {
        state.isAuth = true;
        state.error = '';
        state.user = action.payload.user;
      });
    builder
      .addCase(fetchRefreshTocken.pending, (state) => {
        state.error = '';
      })
      .addCase(fetchRefreshTocken.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchRefreshTocken.fulfilled, (state, action) => {
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      });
  }
});

export const fetchLogin = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (data: TRegisterData) => await updateUserApi(data)
);

export const fetchLogout = createAsyncThunk(
  'user/logaut',
  async () => await logoutApi()
);

export const fetchRegister = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const fetchUserCheck = createAsyncThunk(
  'user/check',
  async () => await getUserApi()
);

export const fetchRefreshTocken = createAsyncThunk(
  'user/refresh',
  async () => await refreshToken()
);

export const {} = slice.actions;
export const { getIsAuth, getUser, getError } = slice.selectors;
export default slice.reducer;

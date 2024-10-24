import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import {
  fetchRefreshTocken,
  fetchUserCheck,
  getIsAuth
} from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from '../../redux/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../redux/slices/ingredientsSlice';
import { fetchFeeds } from '../../redux/slices/historySlice';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const navigate = useNavigate();
  const isAutch = useSelector(getIsAuth);
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchFeeds());

    if (getCookie('accessToken')) {
      try {
        dispatch(fetchUserCheck())
          .unwrap()
          .then(() => dispatch(fetchRefreshTocken()));
      } catch (error) {}
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth={!isAutch}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth={!isAutch}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth={!isAutch}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth={!isAutch}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute onlyUnAuth={isAutch}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute onlyUnAuth={isAutch}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`text text_type_main-medium ${styles.detailHeader}`}
              >
                Информация о ингредиенте
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`text text_type_main-medium ${styles.detailHeader}`}
              >
                Детали заказа
              </p>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path='*'
          element={
            <div className={styles.detailPageWrap}>
              <NotFound404 />
            </div>
          }
        />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Информация о ингредиенте'
                onClose={() => navigate(-1)}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute onlyUnAuth={isAutch}>
                <Modal
                  title='Детали заказа'
                  onClose={() => navigate('/profile/orders')}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

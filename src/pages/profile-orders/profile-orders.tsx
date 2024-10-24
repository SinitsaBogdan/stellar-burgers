import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getHistory } from '../../redux/slices/historySlice';
import { useDispatch, useSelector } from '../../redux/store';
import { fetchUserOrdersHistory } from '../../redux/slices/historySlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrdersHistory());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getHistory);
  return <ProfileOrdersUI orders={orders} />;
};

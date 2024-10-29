import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchFeeds, getFeedsOrders } from '../../redux/slices/historySlice';
import { useDispatch, useSelector } from '../../redux/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getFeedsOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};

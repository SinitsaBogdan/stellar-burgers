import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../redux/store';
import { getUser } from '../../redux/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);
  return <AppHeaderUI userName={user.name || ''} />;
};

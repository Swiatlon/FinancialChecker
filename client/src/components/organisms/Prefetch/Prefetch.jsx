import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import store from '@/app/store';
import { transactionsApiSlice } from '@/features/transactions/transactionsApiSlice';
import { userApiSlice } from '@/features/user/userApiSlice';
import useAuth from '@/hooks/useAuth';

function Prefetch() {
  const { id: userID } = useAuth();
  useEffect(() => {
    store.dispatch(userApiSlice.util.prefetch('getUser', `${userID}`, { force: true }));
    store.dispatch(transactionsApiSlice.util.prefetch('getTransactions', `${userID}`, { force: true }));
  }, []);

  return <Outlet />;
}
export default Prefetch;

import { useSelector } from 'react-redux';
import { RootState } from '../lib/features/store';

const useUser = () => {
  const user = useSelector((store: RootState) => store.auth.user);
  return user;
};

export default useUser;

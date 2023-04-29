import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { selectCurrentToken } from '@/features/auth/authSlice';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  if (token) {
    const decode = jwtDecode(token);
    const { email, id } = decode.UserInfo;
    return { email, id };
  }
  return { email: '', id: '' };
};

export default useAuth;

import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation/Navigation.jsx';
import MainLayoutContainer from './MainLayout.style';

function Layout() {
  return (
    <MainLayoutContainer>
      <Navigation />
      <Outlet />
    </MainLayoutContainer>
  );
}

export default Layout;

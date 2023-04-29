import React from 'react';
import { Outlet } from 'react-router-dom';
import PreAuthOutletContainer from './PreAuthLayout.style';

function PreAuthLayout() {
  return (
    <PreAuthOutletContainer>
      <Outlet />
    </PreAuthOutletContainer>
  );
}

export default PreAuthLayout;

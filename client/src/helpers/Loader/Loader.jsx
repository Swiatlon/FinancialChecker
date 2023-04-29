import React from 'react';
import { useTheme } from 'styled-components';
import { ClipLoader } from 'react-spinners';
import LoaderContainer from './Loader.style';

function Loader() {
  const theme = useTheme();
  return (
    <LoaderContainer>
      <ClipLoader color={`${theme.colors.neonColor}`} />
    </LoaderContainer>
  );
}

export default Loader;

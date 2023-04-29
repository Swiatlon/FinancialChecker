import React from 'react';
import { useTheme } from 'styled-components';
import { ClipLoader } from 'react-spinners';
import LoaderContainer from './Loader.style';

function Loader() {
  const theme = useTheme();
  return (
    <LoaderContainer>
      <ClipLoader color={`${theme?.colors?.neonColor || '#046ee899'}`} />
    </LoaderContainer>
  );
}

export default Loader;

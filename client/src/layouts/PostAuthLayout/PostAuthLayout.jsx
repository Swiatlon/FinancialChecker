import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeUpdateContext } from '@/App';
import { v4 as uuidV4 } from 'uuid';
import { PostAuthContainer, ContentContainer } from './PostAuthLayout.style';
import TopSideInformationBox from '@/components/TopSideInformationBox/TopSideInformationBox';

function PostAuthLayout() {
  // We pass it there only to force rerender of outlet
  const updateAppColor = useContext(ThemeUpdateContext);
  return (
    <PostAuthContainer>
      <TopSideInformationBox updateAppColor={updateAppColor} />
      <ContentContainer>
        <Outlet key={uuidV4()} />
      </ContentContainer>
    </PostAuthContainer>
  );
}

export default PostAuthLayout;

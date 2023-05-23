import React, { useState } from 'react';
import TutorialContainer from './Tutorial.style';
import { SmallTitle, Text } from '@/components/Reusable/Style/ReusableElements.style';
import useGetWidth from '@/hooks/useGetWidth';
import { ImgBox, ThreeItemsPerRow } from '@/components/TutorialElements/Style/TutorialElements.style';
import { ReactComponent as FirstImgPC } from '@/assets/images/CreateUserPC.svg';
import { ReactComponent as FirstImgMobile } from '@/assets/images/CreateUserMobile.svg';
import { ReactComponent as SecondImgPC } from '@/assets/images/AddExpensesPC.svg';
import { ReactComponent as SecondImgMobile } from '@/assets/images/AddExpensesMobile.svg';
import { ReactComponent as ThirdImgPC } from '@/assets/images/TrackExpensesPC.svg';
import { ReactComponent as ThirdImgMobile } from '@/assets/images/TrackExpensesMobile.svg';
import { ReactComponent as ArrowLeft } from '@/assets/icons/arrow-left-circle.svg';
import { ReactComponent as ArrowRight } from '@/assets/icons/arrow-right-circle.svg';

function Tutorial() {
  const width = useGetWidth();
  const isSmallPhone = width <= 375;

  const [index, setIndex] = useState(0);
  const elements = [
    { title: 'Create User', elementPC: <FirstImgPC />, elementMobile: <FirstImgMobile /> },
    { title: 'Add Expenses', elementPC: <SecondImgPC />, elementMobile: <SecondImgMobile /> },
    { title: 'Track Expenses', elementPC: <ThirdImgPC />, elementMobile: <ThirdImgMobile /> },
  ];

  return (
    <TutorialContainer>
      <SmallTitle>{elements[index].title}</SmallTitle>
      <ImgBox>{isSmallPhone ? elements[index].elementMobile : elements[index].elementPC}</ImgBox>
      <ThreeItemsPerRow>
        <button
          type="button"
          onClick={() => {
            if (index > 0) setIndex(index - 1);
          }}
        >
          <ArrowLeft />
        </button>
        <button type="button">
          <Text>
            {index + 1}/{elements.length}
          </Text>
        </button>
        <button
          type="button"
          onClick={() => {
            if (index < elements.length - 1) setIndex(index + 1);
          }}
        >
          <ArrowRight />
        </button>
      </ThreeItemsPerRow>
    </TutorialContainer>
  );
}

export default Tutorial;

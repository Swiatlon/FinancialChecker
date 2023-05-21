import React from 'react';
import { Link } from 'react-router-dom';
import HomeBox from '../Home/Home.style';
import ThreeButtonsBox from '@/components/HomeElements/Style/HomeElements.style';
import { MediumTitle,Text } from '@/components/Reusable/Style/ReusableElements';
// SAME STYLE AS HOME

function PostAuthHome() {
  return (
    <HomeBox>
      <MediumTitle>Welcome</MediumTitle>
      <Text>This website will help you track your expenses!</Text>
      <ThreeButtonsBox>
        <Link to="overview">Get Started!</Link>
        <Link to="/tutorial">Tutorial</Link>
      </ThreeButtonsBox>
    </HomeBox>
  );
}

export default PostAuthHome;

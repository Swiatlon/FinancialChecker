import React from 'react';
import { Link } from 'react-router-dom';
import HomeBox, { ThreeButtonsBox, PostAuthContainer } from '../Home/Home.style';
// SAME STYLE AS HOME

function PostAuthHome() {
  return (
    <HomeBox>
      <h2>Welcome</h2>
      <p>This website will help you track your expenses!</p>
      <ThreeButtonsBox>
        <Link to="overview">Get Started!</Link>
        <Link to="/tutorial">Tutorial</Link>
      </ThreeButtonsBox>
    </HomeBox>
  );
}

export default PostAuthHome;

import React from 'react';
import { Link } from 'react-router-dom';
import HomeBox, { ThreeButtonsBox } from './Home.style';

function Home() {
  return (
    <HomeBox>
      <h2>Welcome</h2>
      <p>This website will help you track your expenses!</p>
      <ThreeButtonsBox>
        <Link to="/register">Get Started!</Link>
        <Link to="/tutorial">Tutorial</Link>
        <Link to="/guest">Guest Account</Link>
      </ThreeButtonsBox>
    </HomeBox>
  );
}

export default Home;

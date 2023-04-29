import styled from 'styled-components';
import errorPageImage from '@/assets/images/errorPage.jpg';

const ErrorPageHeader = styled.header`
  width: 100vw;
  height: 100vh;
  background: url(${errorPageImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  color: white;
  * {
    padding: 10px;
    margin: 0px;
    text-shadow: 6px 0px 6px rgba(0, 0, 0, 1);
  }
  h1 {
    font-size: 2.5rem;
  }
  p {
    font-size: 1.5rem;
  }
`;
export default ErrorPageHeader;

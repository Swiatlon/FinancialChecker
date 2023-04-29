import styled from 'styled-components';
import backgroundIMG from '@/assets/images/background.jpg';

const PreAuthOutletContainer = styled.div`
  width: 100%;
  height: 100%;
  background: url(${backgroundIMG});
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PreAuthOutletContainer;

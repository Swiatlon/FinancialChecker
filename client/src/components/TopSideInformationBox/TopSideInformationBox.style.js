import styled from 'styled-components';

 const TopInformationBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1c1f25;
  font-size: 20px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.neonColor}`};
  box-shadow: ${({ theme }) => `8px 1px 30px 5px ${theme.colors.neonColor}`};
  font-weight: 600;
  img {
    width: 40px;
    padding-right: 20px;
  }
`;

export default TopInformationBox
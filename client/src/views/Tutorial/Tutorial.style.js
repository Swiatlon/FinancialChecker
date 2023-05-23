import styled from 'styled-components';

const TutorialContainer = styled.div`
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.neonColor};
  box-shadow: ${({ theme }) => `8px 1px 30px -20px ${theme.colors.neonColor}`};
  display: grid;
  text-align: center;
  margin: 25px;
  padding: 40px 25px;
  gap: 25px;
  background: rgba(0, 0, 0, 0.9);
`;

export default TutorialContainer;

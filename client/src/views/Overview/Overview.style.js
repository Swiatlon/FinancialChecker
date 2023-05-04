import styled from 'styled-components';
import size from '@/assets/styles/mediaQueries.style';

const OverviewContainer = styled.div`
  width: 90%;
  min-height: 70%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px 40px;
  color: white;
  margin-left: 8%;
  .expenses-red-color {
    color: red;
  }
  :nth-child(1),
  :nth-child(2) {
    padding-top: 100px;
  }
  @media (max-width: ${size.laptop}) {
    gap: 40px;
    margin-left: 0%;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
    justify-items: center;
    text-align: center;
  }
`;

export default OverviewContainer;

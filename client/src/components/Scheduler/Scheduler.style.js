import styled from 'styled-components';

export const SchedulerCenterContainer = styled.div`
  justify-self: center;
  align-self: center;
  font-family: 'Nunito', sans-serif;
  text-shadow: 2px 2px 1px black;
  margin: 10px;
`;

export const SchedulerBox = styled.div`
  border: ${({ theme }) => `2px solid ${theme.colors.neonColor}`};
  position: relative;
`;

export const TopInformation = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 20px;
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.neonColor}`};
  svg {
    cursor: pointer;
  }
`;

export const MonthName = styled.h4`
  color: white;
  text-align: center;
  font-weight: 800;
`;

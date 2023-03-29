import styled from 'styled-components';

export const PostAuthContainer = styled.div`
  width: 100%;
  font-family: 'Quicksand', sans-serif;
`;
export const ContentContainer = styled.div`
  height: calc(100% - 101px); // 100 +1(border) px is topInformationBox height
  position: relative;
  overflow: hidden;
`;
export const TopInformationBox = styled.div`
  width: 100%;
  height: 100px;
  background: #1c1f25;
  display: flex;
  color: white;
  font-size: 20px;
  border-bottom: 1px solid rgba(4, 110, 232, 0.6);
  box-shadow: 8px 1px 30px 5px rgb(4 110 232 / 50%);

  font-weight: 600;
  p {
    margin-left: auto;
    text-align: center;
  }
  img {
    width: 40px;
    padding-right: 20px;
  }
`;
export const UserInformationBox = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;
export const ConfigImg = styled.img`
  margin-left: auto;
  width: 30px !important;
  cursor: pointer;
  /* padding-right: 30px; */
`;

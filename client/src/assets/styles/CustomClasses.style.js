import { createGlobalStyle } from 'styled-components';

const CustomClassesStyle = createGlobalStyle`
  .swal2-popup {
    color: white;
    background: #0f1216;
    transition: 1s all;
  }

  .swal2-confirm {
    background-color: ${({ theme }) => theme.colors.neonColor} !important;
  }
  
  .swal2-question {
    border-color: ${({ theme }) => theme.colors.neonColor} !important;
    color: ${({ theme }) => theme.colors.neonColor} !important;
  }

  .hide{
    display: none;
}

.show{
    display: initial;
}

.error-color{
    color: #ff4b4b;
}
`;
export default CustomClassesStyle;

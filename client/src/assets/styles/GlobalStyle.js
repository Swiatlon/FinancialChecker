import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
//Reseting Styles
*,
*::before,
*::after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
    margin: 0;
    padding: 0;
}
#root{
    width: 100%;
   contain: paint;
    min-height: 100vh;
    display: grid;
    background: #171717;
}
ul{
    list-style-type: none;
}
a{
    text-decoration: none;
}
.hide{
    display: none;
}
.show{
    display: initial;
}

// Alerts custom styles
.swal2-popup{
    color:white;
    background: #0f1216;
    transition: 1s all;
}
`;

export default GlobalStyle;

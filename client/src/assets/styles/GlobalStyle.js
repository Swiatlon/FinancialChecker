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
    color:white;
}
ul{
    list-style-type: none;
}
a{
    color:white;
    text-decoration: none;
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

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
}

`;

export default GlobalStyle;

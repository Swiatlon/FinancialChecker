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
`;

export default GlobalStyle;

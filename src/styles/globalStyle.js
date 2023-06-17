import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'DOSMyungjo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSMyungjo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body, * {
    font-family: 'DOSMyungjo', sans-serif;
  }
`;

export default GlobalStyle;
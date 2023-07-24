import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  @font-face {
    font-family: 'DOSMyungjo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSMyungjo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'DOSGothic';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSGothic.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  @font-face {
    font-family: 'DOSIyagiMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/DOSIyagiMedium.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}


  body, * {
    font-family: 'DOSMyungjo', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  div {
      /* Chrome, Safari, Opera */
    ::-webkit-scrollbar {
      display: none;
    }
    /* Firefox */
    scrollbar-width: none;
    /* IE and Edge */
    -ms-overflow-style: none;
  }
  pre {
    white-space: pre-wrap;       /* CSS3  */
    white-space: -moz-pre-wrap;  /* Firefox */
    white-space: -pre-wrap;      /* Opera <7 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* IE */
  }
  html, main {
    scroll-behavior: smooth;
  }
`;

export default GlobalStyle;

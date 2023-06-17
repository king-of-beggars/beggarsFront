import './App.css';
import { btn, pressedBtn } from "assets"
import { DefaultBtn } from 'components';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import { layout, style } from 'styles';
import GlobalStyle from 'styles/globalStyle';

function App() {
  console.log(window.navigator.userAgent)
  const isMobile = /Mobi/i.test(window.navigator.userAgent)
  return (
    <>
      <GlobalStyle />
        <layout.PageLayout isMobile={isMobile}>
          <Signup />
        </layout.PageLayout>
      {/* <layout.FlexCenter>
        <style.CanvasContainer style={{position: "relative", display: "flex", justifyContent: "center"}}>
          <DefaultBtn>click me!</DefaultBtn>
        </style.CanvasContainer>
      </layout.FlexCenter> */}
    </>


  );
}

export default App;

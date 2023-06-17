import './App.css';
import { btn, pressedBtn } from "./assets/pixels"
import { DefaultBtn } from './components';
import Login from './pages/Login';
import { layout, style } from './styles';
import GlobalStyle from './styles/globalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <Login />
      {/* <layout.FlexCenter>
        <style.CanvasContainer style={{position: "relative", display: "flex", justifyContent: "center"}}>
          <DefaultBtn>click me!</DefaultBtn>
        </style.CanvasContainer>
      </layout.FlexCenter> */}
    </>


  );
}

export default App;

import './App.css';
import { btn, pressedBtn } from "./pixels"
import { DefaultBtn } from './components';
import { layout, style } from './styles';
import GlobalStyle from './globalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <layout.FlexCenter>
        <style.CanvasContainer style={{position: "relative", display: "flex", justifyContent: "center"}}>
          {/* <img src={btn} style={{position: "absolute", bottom: "20px"}}/> */}
          <DefaultBtn>click me!</DefaultBtn>
        </style.CanvasContainer>
      </layout.FlexCenter>
    </>


  );
}

export default App;

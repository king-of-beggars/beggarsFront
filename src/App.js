import './App.css';
import { btn, pressedBtn } from "assets"
import { DefaultBtn } from 'components';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Profile from 'pages/Profile'
import CashBook from 'pages/CashBook'
import { layout, style } from 'styles';
import GlobalStyle from 'styles/globalStyle';
import Router from 'router/Router';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  console.log(window.navigator.userAgent)
  const isMobile = /Mobi/i.test(window.navigator.userAgent)

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
        <layout.PageLayout isMobile={isMobile}>
          <Router />
        </layout.PageLayout>
      {/* <layout.FlexCenter>
        <style.CanvasContainer style={{position: "relative", display: "flex", justifyContent: "center"}}>
          <DefaultBtn>click me!</DefaultBtn>
        </style.CanvasContainer>
      </layout.FlexCenter> */}
    </QueryClientProvider>


  );
}

export default App;

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
import Test from 'pages/Test';
import CashBookDetail from 'pages/CashBookDetail';

const queryClient = new QueryClient();
// const AppContext = React.createContext();

// const contextValue = {
//   frameSize: {
//     width: 393,
//     height: 852
//   },
//   boardBtnActivate: {
//     width: 160,
//     height: 38
//   },
//   boardBtnSleep: {
//     width: 154,
//     height: 36
//   },
//   boardBtnBar: {
//     width: 307,
//     height: 36
//   },
//   frameRatio: 852 / 393,
// }

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      {/* <Test /> */}
      {/* <AppContext.Provider value={contextValue}> */}
        <layout.FlexCenterColumn>
          <Router />
        </layout.FlexCenterColumn>
      {/* </AppContext.Provider>     */}
    </QueryClientProvider>


  );
}

export default App;

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      {/* <Test /> */}
      <layout.FlexCenterColumn>
        <Router />
      </layout.FlexCenterColumn>
          
    </QueryClientProvider>


  );
}

export default App;

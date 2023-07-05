import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';
import { layout, style } from 'styles';
import GlobalStyle from 'styles/globalStyle';
import Router from 'router/Router';

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
      {/* <AppContext.Provider value={contextValue}> */}
        <layout.FlexCenterColumn>
          <Router />
        </layout.FlexCenterColumn>
      {/* </AppContext.Provider>     */}
    </QueryClientProvider>


  );
}

export default App;

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { GlobalVariableProvider } from 'providers';
import { layout, } from 'styles';
import GlobalStyle from 'styles/globalStyle';
import Router from 'router/Router';

const queryClient = new QueryClient();

function App() {
  return (
    // <>
    //   <MainFailCoin />
    //   <MainGoldCoin />
    //   <MainSilverCoin />
    // </>

    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <GlobalVariableProvider>
        <layout.FlexCenterColumn>
          <Router />
        </layout.FlexCenterColumn>
      </GlobalVariableProvider>    
    </QueryClientProvider>


  );
}

export default App;

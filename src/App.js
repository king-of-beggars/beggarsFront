import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';
import { layout, } from 'styles';
import GlobalStyle from 'styles/globalStyle';
import Router from 'router/Router';
import { GlobalVariableProvider } from 'components';

const queryClient = new QueryClient();

function App() {
  return (
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

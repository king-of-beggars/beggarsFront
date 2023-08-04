import React from 'react';

import { layout } from 'styles';
import Router from 'router/Router';
import GlobalStyle from 'styles/globalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContextProvider } from 'features/auth/contexts/AuthProvider';
import { GlobalVariableProvider } from 'common/components/provider/GlobalVariableProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <AuthContextProvider>
        <GlobalVariableProvider>
          <layout.FlexCenterColumn>
            <Router />
          </layout.FlexCenterColumn>
        </GlobalVariableProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;

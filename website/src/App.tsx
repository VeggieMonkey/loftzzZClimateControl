import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Wrapper, Loading } from "./common";
import { Sidebar, pages } from "./pages";
import { firebaseDoingAuth } from "./hooks/useFirebase";
import { Settings } from "./pages/Settings";

function App() {
  const [loading, setLoading] = React.useState(false);
  const queryClient = new QueryClient();

  React.useEffect(() => {
    firebaseDoingAuth.then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Router>
        <Wrapper>
          <Sidebar>
            <Switch>
              {pages.map(({ Component, route }) => {
                return (
                  <Route key={route} path={route}>
                    <Component />
                  </Route>
                );
              })}
              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          </Sidebar>
        </Wrapper>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

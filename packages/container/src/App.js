import React, {lazy, Suspense, useState} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

import Header from './components/Header';
import ProgressBar from './components/Progress';

const MarketingApp = lazy(() => import('./components/MarketingApp'));
const AuthApp = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <BrowserRouter>
    <StylesProvider generateClassName={generateClassName}>
      <div>
        <Header onSignOut={()=> setIsSignedIn(false)} isSignedIn={isSignedIn}/>
        <Suspense fallback={<ProgressBar/>}>

        <Switch>
          <Route path="/auth">
            <AuthApp onSignIn={() => setIsSignedIn(true)}/>
          </Route>
          <Route path="/" component={MarketingApp}/>
        </Switch>
        </Suspense>
      </div>
    </StylesProvider>
    </BrowserRouter>
  );
};

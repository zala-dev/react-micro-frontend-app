import React, {lazy, Suspense, useState, useEffect} from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import {createBrowserHistory} from 'history';

import Header from './components/Header';
import ProgressBar from './components/Progress';

const MarketingApp = lazy(() => import('./components/MarketingApp'));
const AuthApp = lazy(() => import('./components/AuthApp'));
const DashboardApp = lazy(()=> import('./components/DashboardApp'))

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  useEffect(()=>{
    if(isSignedIn){
      history.push('/dashboard');
    } 
  }, [isSignedIn]);
  
  return (
    <Router history={history}>
    <StylesProvider generateClassName={generateClassName}>
      <div>
        <Header onSignOut={()=> setIsSignedIn(false)} isSignedIn={isSignedIn}/>
        <Suspense fallback={<ProgressBar/>}>

        <Switch>
          <Route path="/auth">
            <AuthApp onSignIn={() => setIsSignedIn(true)}/>
          </Route>
          <Route path="/dashboard" >
            {!isSignedIn && <Redirect to='/'/> }
            <DashboardApp/>
            </Route>
          <Route path="/" component={MarketingApp}/>
        </Switch>
        </Suspense>
      </div>
    </StylesProvider>
    </Router>
  );
};

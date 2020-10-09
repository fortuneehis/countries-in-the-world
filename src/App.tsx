import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './main';
import Header from './components/header';
import Context from './context/countryContext';

function App() {
  return (
    <div className="App">
      <Header/>
      <Context>
        <BrowserRouter>
              <Switch>
                  <Route path="/">
                      <Main/>
                  </Route>
              </Switch>
        </BrowserRouter>
      </Context>
    </div>
  );
}

export default App;

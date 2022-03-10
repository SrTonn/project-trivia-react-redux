import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import './App.css';
import store from './redux/store';
import Game from './pages/Game';
import Settings from './pages/Settings';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/game" component={ Game } />
            <Route path="/settings" component={ Settings } />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BaseLayout} from './components/BaseLayout'
import {Reports} from './components/Reports'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
  <BaseLayout>
    <Switch>
      <Route path="/" exact component={App}/>
      <Route path="/reports" component={Reports}/>
    </Switch>
    </BaseLayout>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

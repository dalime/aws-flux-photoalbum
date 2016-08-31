import React from 'react';
import { render } from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';

import Home from './components/Home';
import Album from './components/Album';
import Photo from './components/Photo';

//import './css/style.css';

render((
  <Router history={browserHistory}>
    <Route path='/' component={Home} />
    <Route path='/album/:id' component={Album} />
    <Route path='/photo/:id' component={Photo} />
  </Router>
), document.getElementById('root')
);

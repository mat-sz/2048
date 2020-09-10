import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/">
            <h1>Hello, world!</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './login/Login';
import AdminPanel from './admin-panel/AdminPanel';
import { ProtectedRoute } from './protected-route/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Login} />   
        <ProtectedRoute path="/admin-panel" component={AdminPanel} />   

        <Route path="*" component={() => "404 NOT FOUND :]"} />
      </Switch>
    </div>
  );
}

export default App;

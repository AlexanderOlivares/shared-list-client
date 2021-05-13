import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import InputItem from "./components/InputItem";
import ListItem from "./components/ListItem";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = Boolean => setIsAuthenticated(Boolean);

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={props =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          ></Route>
          <Route
            exact
            path="/register"
            render={props =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          ></Route>
          <Route
            exact
            path="/dashboard"
            render={props =>
              isAuthenticated ? (
                <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          ></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

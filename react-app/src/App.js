import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/account"></Route>
          <Route exact path="/profile/edit"></Route>
          <Route exact path="/profile/new"></Route>
          <Route exact path="/checkout"></Route>
          <Route exact path="/search"></Route>
          <Route exact path="/:linkName">
            <Profile />
          </Route>
        </Switch>
      )}
      <Navigation isLoaded={isLoaded} />
    </>
  );
}

export default App;

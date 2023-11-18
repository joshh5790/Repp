import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import CreateProfile from "./components/Pages/CreateProfile";
import EditProfile from "./components/Pages/EditProfile";
import AccountSettings from "./components/Pages/AccountSettings";
import Checkout from "./components/Pages/Checkout";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <Helmet>
            <title>REPP</title>
          </Helmet>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/account">
              <AccountSettings />
            </Route>
            <Route exact path="/profile/edit">
              <EditProfile />
            </Route>
            <Route exact path="/profile/new">
              <CreateProfile />
            </Route>
            <Route exact path="/carts"></Route>
            <Route exact path="/orders"></Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
            <Route exact path="/search"></Route>
            <Route exact path="/confirmation"></Route>
            <Route exact path="/:linkName">
              <Profile />
            </Route>
          </Switch>
          <Navigation isLoaded={isLoaded} />
        </>
      )}
    </>
  );
}

export default App;

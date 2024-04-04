import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import { getSubdomain } from "./utilities";
import { useSubdomain } from "./context/Subdomain";
import Navigation from "./components/Navigation";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import CreateProfile from "./components/Pages/CreateProfile";
import EditProfile from "./components/Pages/EditProfile";
import AccountSettings from "./components/Pages/AccountSettings";
import Carts from "./components/Pages/Carts";
import Orders from "./components/Pages/Orders";
// import Checkout from "./components/Pages/Checkout";
import Confirmation from "./components/Pages/Confirmation";
import Sidebar from "./components/Sidebar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { subdomain, setSubdomain } = useSubdomain()
  useEffect(() => {
    document.title = "REPP";
    dispatch(authenticate()).then(() => {
      setSubdomain(getSubdomain())
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          {!subdomain || subdomain === "www" ?
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/account/carts">
                <Carts />
              </Route>
              <Route exact path="/account/orders">
                <Orders />
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
              {/* <Route exact path="/checkout/:linkName">
                <Checkout />
              </Route> */}
              <Route exact path="/confirmation/:linkName">
                <Confirmation />
              </Route>
              <Route exact path="/:linkName">
                <Profile />
              </Route>
            </Switch> : <Switch>
              <Route exact path="/">
                <Profile subdomain={subdomain} />
              </Route>
            </Switch>
          }
          <Navigation isLoaded={isLoaded} />
          <Sidebar />
        </>
      )}
    </>
  );
}

export default App;

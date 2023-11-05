import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Switch } from "react-router-dom"
import { authenticate } from "./store/session"
import Navigation from "./components/Navigation"
import HomePage from "./components/Pages/HomePage"
import ReppPage from "./components/Pages/ReppPage"

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <HomePage />
          </Route>
          <Route exact path='/:linkName'>
            <ReppPage />
          </Route>
        </Switch>
      )}
      <Navigation isLoaded={isLoaded} />
    </>
  )
}

export default App

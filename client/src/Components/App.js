import React from 'react'

const App = () => {
  return (
    <Router>
        <Switch>
            <Route path ="/Pay">
                <Pay/>
            </Route>
            <Route path ="/Success">
                <Success/>
            </Route>
        </Switch>
    </Router>
  )
}

export default App
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink  } from 'react-router-dom';

import Login from './componant/Login';
import Home from './componant/Home';
import Map from './componant/Map';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken ,removeUserSession } from './Utils/Common';


function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [loged , setLoged]=useState("")
  

  useEffect(() => {
    const token = getToken();
    token ? setAuthLoading(false) : setAuthLoading(true)    
  },[]);

  useEffect(()=>{
    !authLoading ? setLoged("Logout") : setLoged("Login")
  },[authLoading])

  

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  // handle click event of logout button
  const handleLogout =  () => {
    removeUserSession(setLoged);
    setAuthLoading(false)   
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/map">Map</NavLink><small>(Access with token only)</small>
            <NavLink activeClassName="active" to="/login" onClick={handleLogout}> {loged}</NavLink>   
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/Map" component={Map} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

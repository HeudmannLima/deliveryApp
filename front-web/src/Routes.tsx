import { BrowserRouter, Route, Switch } from "react-router-dom";
import Orders from "./Orders";
import Home from "./Home";
import Navbar from "./Navbar";

function Routes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>      
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState } from "react";


import Home from "./pages/Home";
import OrderPizza from "./pages/OrderPizza";
import Success from "./pages/Success";

export default function App() {

  const [order, setOrder] = useState(null);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/order">
          <OrderPizza setOrder={setOrder} />
        </Route>

        <Route path="/success">
          <Success order={order} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}



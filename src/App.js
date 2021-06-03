import React from "react";
import Navbar from "./components/navbar";
import MyImages from "./pages/myImages";
import Upload from "./pages/upload";
import PublicImages from "./pages/publicImages";
import Home from "./pages/home";
import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Switch>
        <Route exact path='/' component={Home} />

        <Route path='/my-images'>
          <MyImages></MyImages>
        </Route>
        <Route path='/upload'>
          <Upload></Upload>
        </Route>
        <Route path='/public-images'>
          <PublicImages></PublicImages>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

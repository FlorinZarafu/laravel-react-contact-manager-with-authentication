import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Dashboard from "./components/pages/dashboard/Dashboard";
import { PrivateRoute } from "./components/privet-route/PrivetRoute";

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;

import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../../layouts/header/Header";
import Login from "../../layouts/login/Login";
import Register from "../../layouts/register/Register";

const Home = props => {
    console.log(`the props from home component:`, props);
    return (
        <div>
            <Header props={props} />
            <Switch>
                <Route exact path={props.match.path} component={Login} />
                <Route
                    path={`${props.match.path}/register`}
                    component={Register}
                />
            </Switch>
        </div>
    );
};
export default Home;

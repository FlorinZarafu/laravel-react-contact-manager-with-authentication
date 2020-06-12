import React from "react";
import SideBar from "../../layouts/side-bar/SideBar";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./GeneralJSXstyles";
import "./dashboard.css";
import { Switch, Route } from "react-router-dom";
import AddContact from "../../layouts/add-contact/AddContact";
import ViewContact from "../../layouts/view-contact/ViewContact";
import EditContact from "../../layouts/edit-contact/EditContact";

const Dashboard = props => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <>
            <SideBar props={props} />
            <div className="main-content">
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route
                            exact
                            path={props.match.path}
                            component={ViewContact}
                        />
                        <Route
                            exact
                            path={`${props.match.path}/view-contacts`}
                            component={ViewContact}
                        />
                        <Route
                            exact
                            path={`${props.match.path}/add-contacts`}
                            component={AddContact}
                        />
                        <Route
                            exact
                            path={`${props.match.path}/edit-contact/:id`}
                            component={EditContact}
                        />
                    </Switch>
                </main>
            </div>
        </>
    );
};
export default Dashboard;

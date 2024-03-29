import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Link, NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton>
                        <Link to="/">Laravel-React</Link>
                    </IconButton>
                    <Typography
                        variant="h6"
                        className={classes.title}
                    ></Typography>
                    <NavLink to="/home">
                        <Button>Login</Button>
                    </NavLink>
                    <NavLink to="/home/register">
                        <Button>Register</Button>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default Header;

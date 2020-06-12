import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./form-login.styles.css";

import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/AuthAction";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    handleSubmit = e => {
        e.preventDefault();
        console.log("ready to log in a user");
        console.log(this.state);
        this.props.loginUser(this.state, this.props.history);
    };
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };
    render() {
        const { email, password } = this.state;
        return (
            <div>
                <form
                    autoComplete="off"
                    className="form-login"
                    onSubmit={this.handleSubmit}
                >
                    <h3>Login Form</h3>
                    <TextField
                        style={{ width: 500, marginTop: 10 }}
                        required
                        label="Email"
                        placeholder="Enter Your Email"
                        fullWidth
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                    <TextField
                        style={{ width: 500, marginTop: 10 }}
                        required
                        label="Password"
                        placeholder="Enter Your Password"
                        fullWidth
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ width: 500, marginTop: 10 }}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        authResponse: state.auth.authResponse
    };
};
const mapDispatchToProps = dispatch => {
    return {
        loginUser: (creds, history) => dispatch(loginUser(creds, history))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

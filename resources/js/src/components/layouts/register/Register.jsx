import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./form-register.styles.css";

import { connect } from "react-redux";
import { signUp } from "../../../redux/actions/AuthAction";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handle submit function for registration
    handleSubmit(e) {
        e.preventDefault();
        console.log("submit was clickeedd");
        console.log(this.state);
        this.props.signUp(this.state);
    }
    // handle change function for form fields
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    render() {
        const { firstname, lastname, email, password } = this.state;
        return (
            <div>
                <form
                    autoComplete="off"
                    className="form-register"
                    onSubmit={this.handleSubmit}
                >
                    <h3>Register Form</h3>
                    <TextField
                        style={{ width: 500, marginTop: 10 }}
                        required
                        label="First Name"
                        placeholder="Last Name"
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                        name="firstname"
                        value={firstname}
                    />
                    <TextField
                        style={{ width: 500, marginTop: 10 }}
                        required
                        label="Last Name"
                        placeholder="Last Name"
                        fullWidth
                        type="text"
                        onChange={this.handleChange}
                        name="lastname"
                        value={lastname}
                    />
                    <TextField
                        style={{ width: 500, marginTop: 10 }}
                        required
                        label="email"
                        placeholder="email"
                        fullWidth
                        type="email"
                        onChange={this.handleChange}
                        name="email"
                        value={email}
                    />
                    <TextField
                        style={{ width: 500, marginTop: 10 }}
                        required
                        label="password"
                        placeholder="password"
                        fullWidth
                        type="password"
                        onChange={this.handleChange}
                        name="password"
                        value={password}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ width: 500, marginTop: 10 }}
                        type="submit"
                    >
                        Register
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
        signUp: creds => dispatch(signUp(creds))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);

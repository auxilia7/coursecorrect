import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import { Link } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username")
      .error(() => {
        return {
          message:
            "Please enter your email address in order to register."
        };
      }),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
      .error(() => {
        return {
          message:
            "Please enter a password (minimum 5 characters) in order to register."
        };
      }),
    name: Joi.string()
      .required()
      .label("Name")
      .error(() => {
        return {
          message:
            "Please enter a name for the account in order to register."
        };
      })
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/courses";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username =
          "Sorry, a user with this email address is already registered, please login.";
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <p className="text-center">
            Welcome, please register an account for Course Correct!
          </p>
          <p className="text-center">
            Already a member? <Link to={`/login`}>Log in now!</Link>
          </p>
        </div>
        <div className="container my-3">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Email (Username)")}
            {this.renderInput("password", "Password", "password")}
            <p className="text-muted">Our only password constraint is to have a minimum of 5 characters.</p>
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;

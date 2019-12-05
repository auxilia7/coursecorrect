import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username")
      .error(() => {
        return {
          message:
            "Please enter your email address (username) in order to login."
        };
      }),
    password: Joi.string()
      .required()
      .label("Password")
      .error(() => {
        return {
          message:
            "Please enter a password in order to login."
        };
      })
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/home";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  // renderLink(name, label, type = "text") {
  //   const { data, errors } = this.state;
  //   return (
  //     <div className="text-center">
  //       <Link
  //         type={type}
  //         name={name}
  //         value={data[name]}
  //         label={label}
  //         onChange={this.handleChange}
  //         error={errors[name]}
  //       />
  //     </div>
  //   );
  // }

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/home" />;

    return (
      <div>
        <div className="container my-3">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Email (Username)")}
            {this.renderInput("password", "Password", "password")}
            <p className="text-muted">
              Hint: Our only password constraint is to have a minimum of 5
              characters.
            </p>
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;

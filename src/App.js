import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import Courses from "./components/courses";
import CourseForm from "./components/courseForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import Home from "./components/home";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
//import Registration from "./components/registration";
import NavBar from "./components/navBar";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <ToastContainer />
        <NavBar user={user} />
        <div className="content">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/courses/:id" component={CourseForm} />
            <ProtectedRoute
              path="/courses"
              render={props => <Courses {...props} user={this.state.user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/register" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

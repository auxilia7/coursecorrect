import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <h2 className="text-center my-3">I Want To...</h2>
        <div className="row">
          <div className="card-deck" style={{ marginBottom: 20 }}>
            <div className="card">
              <img className="card-img-top" src={require("../register.png")} alt="Action" />
              <div className="card-body">
                <Link to="/courses" className="btn btn-primary btn-block">
                  Register for Courses
                </Link>
                <p className="card-text text-muted text-center">
                  Setup your schedule, and get ready for the next semester!
                </p>
              </div>
            </div>
            <div className="card">
              <img className="card-img-top" src={require("../grades.png")} alt="Action" />
              <div className="card-body">
                <Link to="#nogo" className="btn btn-primary btn-block">
                  Check my Grades
                </Link>
                <p className="card-text text-muted text-center">
                  Let's see how things went.
                </p>
              </div>
            </div>
            <div className="card">
              <img className="card-img-top" src={require("../transcript.png")} alt="Action" />
              <div className="card-body">
                <Link to="#nogo" className="btn btn-primary btn-block">
                  Administer Transcript
                </Link>
                <p className="card-text text-muted text-center">
                  The one stop transcript shop.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card-deck">
            <div className="card">
              <img
                className="card-img-top"
                src={require("../pay_for_courses.png")}
                alt="Action"
              />
              <div className="card-body">
                <Link to="#nogo" className="btn btn-primary btn-block">
                  Pay for my Courses
                </Link>
                <p className="card-text text-muted text-center">
                  The nitty gritty.
                </p>
              </div>
            </div>
            <div className="card">
              <img className="card-img-top" src={require("../update_info.png")} alt="Action" />
              <div className="card-body">
                <Link to="#nogo" className="btn btn-primary btn-block">
                  Update my Information
                </Link>
                <p className="card-text text-muted text-center">
                  Swap dorms or new home address? Let us know here!
                </p>
              </div>
            </div>
            <div className="card">
              <img className="card-img-top" src={require("../grad_cap.png")} alt="Action" />
              <div className="card-body">
                <Link to="#nogo" className="btn btn-primary btn-block">
                  Administer Graduation
                </Link>
                <p className="card-text text-muted text-center">
                  The big day is on its way. Let's make sure everything goes
                  smoothly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

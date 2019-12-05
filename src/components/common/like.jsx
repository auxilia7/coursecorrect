import React, { Component } from "react";

//shows trending interest for classes (background analytics)
//automatically adds the class to "Favorites"
class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    classes += this.props.liked === true ? "" : "-o";
    return (
      <i
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        className={classes}
        aria-hidden="true"
      />
    );
  }
}

export default Like;

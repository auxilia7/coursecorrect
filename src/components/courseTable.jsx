import React, { Component } from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class CourseTable extends Component {
  columns = [
    {
      path: "subject.name",
      label: "Subject"
    },
    {
      path: "courseTitle",
      label: "Course Title"
    },
    {
      path: "courseNumber",
      label: "Course Number"
    },
    {
      key: "like",
      label: "Add to Schedule",
      content: course => (
        <Like liked={course.liked} onClick={() => this.props.onLike(course)} />
      )
    }
  ];

  editColumn = {
    key: "edit",
    content: course => (
      <Link to={`/courses/${course._id}`}>
        <button className="btn btn-primary btn-sm">Edit</button>
      </Link>
    )
  };

  deleteColumn = {
    key: "delete",
    content: course => (
      <button
        onClick={() => this.props.onDelete(course)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.editColumn);
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { courses, onSort, sortColumn, onCourseSelect } = this.props;

    return (
      <Table
        columns={this.columns}
        data={courses}
        sortColumn={sortColumn}
        onSort={onSort}
        onCourseSelect={onCourseSelect}
      />
    );
  }
}

export default CourseTable;

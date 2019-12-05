import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  raiseCourseSelect = courseId => {
    this.props.onCourseSelect(courseId);
  };

  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr
            onClick={() => this.raiseCourseSelect(item._id)}
            style={{ cursor: "pointer" }}
            key={item._id}
          >
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;

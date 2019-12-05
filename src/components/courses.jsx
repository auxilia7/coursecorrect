import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import CourseTable from "./courseTable";
import EventCalendar from "./common/eventCalendar";
import SearchBox from "./searchBox";
import { getCourses, deleteCourse } from "../services/courseService";
import { Link } from "react-router-dom";
import { getSubjects } from "../services/subjectService";
import moment from "moment";

class Courses extends Component {
  state = {
    courses: [],
    subjects: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedSubject: null,
    selectedCourse: null,
    sortColumn: { path: "subject", order: "asc" },
    semester: "Fall 2019",
    events: [],
    defaultDate: new Date()
  };

  async componentDidMount() {
    const { data } = await getSubjects();
    const subjects = [{ _id: "", name: "All Subjects" }, ...data];
    const { data: courses } = await getCourses();

    this.setState({ courses, subjects });
  }

  handleDelete = async course => {
    const originalCourses = this.state.courses;
    const courses = originalCourses.filter(m => m._id !== course._id);
    this.setState({ courses });

    try {
      await deleteCourse(course._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This course has already been deleted.");
      }

      this.setState({ courses: originalCourses });
    }
  };

  handleLike = course => {
    const courses = [...this.state.courses];
    const index = courses.indexOf(course);
    courses[index] = { ...courses[index] };
    courses[index].liked = !courses[index].liked;

    let events = [...this.state.events];
    let defaultDate = new Date();
    if (courses[index].liked) {
      events.push({
        id: courses[index]._id,
        start: new Date(
          courses[index].dateYearStart,
          courses[index].dateMonthStart,
          courses[index].dateDayStart,
          courses[index].dateHourStart,
          courses[index].dateMinuteStart
        ),
        end: new Date(
          courses[index].dateYearStart,
          courses[index].dateMonthStart,
          courses[index].dateDayStart,
          courses[index].dateHourEnd,
          courses[index].dateMinuteEnd
        ),
        title: courses[index].courseTitle
      });
      defaultDate = new Date(
        courses[index].dateYearStart,
        courses[index].dateMonthStart,
        courses[index].dateDayStart,
        courses[index].dateHourStart,
        courses[index].dateMinuteStart
      );
    } else {
      console.log(
        "Found event",
        events.find(e => e.id === courses[index]._id)
      );
      events = events.filter(e => e.id !== courses[index]._id);
    }

    this.setState({ courses, events, defaultDate });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSubjectSelect = event => {
    this.setState({
      selectedSubject: this.state.subjects.find(
        s => s._id === event.target.value
      ),
      searchQuery: "",
      currentPage: 1
    });
  };

  handleCourseSelect = courseId => {
    console.log(courseId);
    this.setState({
      selectedCourse: this.state.courses.find(c => c._id === courseId)
    });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedSubject: null,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedSubject,
      searchQuery,
      courses: allCourses
    } = this.state;

    let filtered = allCourses;
    if (searchQuery)
      filtered = allCourses.filter(
        c =>
          c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.daysOfTheWeek.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.campus.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedSubject && selectedSubject._id)
      filtered = allCourses.filter(c => c.subject._id === selectedSubject._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const courses = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: courses };
  };

  render() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      selectedCourse,
      events,
      defaultDate
    } = this.state;
    const { user } = this.props;

    if (this.state.courses.length === 0)
      return <p>There are no matching courses.</p>;

    const { totalCount, data: courses } = this.getPagedData();

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group my-3">
                  <select
                    onChange={this.handleSubjectSelect.bind(this)}
                    className="form-control input-sm"
                  >
                    {this.state.subjects.map(item => (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-sm-8">
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </div>
            </div>
            <p>Showing {totalCount} matching courses.</p>
            {user.isAdmin && (
              <Link
                to="/courses/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Course
              </Link>
            )}
            <div className="row">
              <div className="col">
                <CourseTable
                  courses={courses}
                  sortColumn={sortColumn}
                  onDelete={this.handleDelete}
                  onCourseSelect={this.handleCourseSelect}
                  onLike={this.handleLike}
                  onSort={this.handleSort}
                />
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
            <div className="row">
              {selectedCourse && (
                <div className="col">
                  <div className="card" style={{ marginBottom: 20 }}>
                    <div className="card-body">
                      <h5 className="card-title">
                        {selectedCourse.courseTitle}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {selectedCourse.instructor}
                      </h6>
                      <p className="card-text">{selectedCourse.description}</p>
                      <p className="card-text text-muted">
                        Campus: {selectedCourse.campus}
                      </p>
                      <p className="card-text text-muted">
                        Days: {selectedCourse.daysOfTheWeek}
                      </p>
                      <p className="card-text text-muted">
                        Building: {selectedCourse.building}, Room:{" "}
                        {selectedCourse.buildingRoomNumber}
                      </p>
                      <p className="card-text text-muted">
                        Capacity: {selectedCourse.capacity}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <EventCalendar defaultDate={defaultDate} events={events} />
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;

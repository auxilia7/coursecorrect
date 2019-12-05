import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCourse, saveCourse } from "../services/courseService";
import { getSubjects } from "../services/subjectService";

class CourseForm extends Form {
  state = {
    data: {
      courseTitle: "",
      subjectId: "",
      courseNumber: "",
      section: "",
      campus: "",
      numberOfCredits: "",
      daysOfTheWeek: "",
      capacity: "",
      instructor: "",
      building: "",
      buildingRoomNumber: "",
      description: ""
    },
    subjects: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    courseTitle: Joi.string()
      .required()
      .label("Course Title")
      .error(() => {
        return {
          message: "Please enter a course title in order to add a new course."
        };
      }),
    subjectId: Joi.string()
      .required()
      .label("Subject")
      .error(() => {
        return {
          message: "Please enter a subject in order to add a new course."
        };
      }),
    courseNumber: Joi.number()
      .required()
      .min(0)
      .max(2000)
      .label("Course Number")
      .error(() => {
        return {
          message: "Please enter a course number in order to add a new course."
        };
      }),
    section: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Section")
      .error(() => {
        return {
          message: "Please enter a course section in order to add a new course."
        };
      }),
    campus: Joi.string()
      .required()
      .trim()
      .min(5)
      .max(255)
      .label("Campus")
      .error(() => {
        return {
          message: "Please enter a course campus in order to add a new course."
        };
      }),
    numberOfCredits: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Number of Credits")
      .error(() => {
        return {
          message:
            "Please enter the number of course credits in order to add a new course."
        };
      }),
    daysOfTheWeek: Joi.string()
      .required()
      .trim()
      .min(5)
      .max(255)
      .label("Days of the Week")
      .error(() => {
        return {
          message:
            "Please enter the days of the week for the course in order to add a new course."
        };
      }),
    capacity: Joi.number()
      .required()
      .min(0)
      .max(500)
      .label("Capacity")
      .error(() => {
        return {
          message:
            "Please enter the course capacity in order to add a new course."
        };
      }),
    instructor: Joi.string()
      .required()
      .trim()
      .min(3)
      .max(255)
      .label("Instructor")
      .error(() => {
        return {
          message:
            "Please enter the course instructor in order to add a new course."
        };
      }),
    building: Joi.string()
      .required()
      .trim()
      .min(3)
      .max(255)
      .label("Building")
      .error(() => {
        return {
          message:
            "Please enter the couse building in order to add a new course."
        };
      }),
    buildingRoomNumber: Joi.number()
      .required()
      .min(0)
      .max(10000)
      .label("Building Room Number")
      .error(() => {
        return {
          message:
            "Please enter a course building room number in order to add a new course."
        };
      }),
    description: Joi.string()
      .required()
      .trim()
      .min(3)
      .max(10000)
      .label("Description")
      .error(() => {
        return {
          message:
            "Please enter a course description in order to add a new course."
        };
      })
  };

  async componentDidMount() {
    const { data: subjects } = await getSubjects();
    this.setState({ subjects });

    const courseId = this.props.match.params.id;
    if (courseId === "new") return;

    try {
      const { data: course } = await getCourse(courseId);
      this.setState({ data: this.mapToViewModel(course) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  mapToViewModel(course) {
    return {
      _id: course._id,
      courseTitle: course.courseTitle,
      subjectId: course.subject._id,
      courseNumber: course.courseNumber,
      section: course.section,
      campus: course.campus,
      numberOfCredits: course.numberOfCredits,
      daysOfTheWeek: course.daysOfTheWeek,
      capacity: course.capacity,
      instructor: course.instructor,
      building: course.building,
      buildingRoomNumber: course.buildingRoomNumber,
      description: course.description
    };
  }

  doSubmit = async () => {
    await saveCourse(this.state.data);

    this.props.history.push("/courses");
  };

  render() {
    return (
      <div>
        <p className="text-center">Add a new course to the catalog.</p>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("courseTitle", "Course Title")}
          {this.renderSelect("subjectId", "Subject", this.state.subjects)}
          {this.renderInput("courseNumber", "Course Number", "number")}
          {this.renderInput("section", "Section", "number")}
          {this.renderInput("campus", "Campus")}
          {this.renderInput("numberOfCredits", "Number of Credits", "number")}
          {this.renderInput("daysOfTheWeek", "Days of the Week")}
          {this.renderInput("capacity", "Capacity", "number")}
          {this.renderInput("instructor", "Instructor")}
          {this.renderInput("building", "Building")}
          {this.renderInput(
            "buildingRoomNumber",
            "Building Room Number",
            "number"
          )}
          {this.renderInput("description", "Description")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CourseForm;

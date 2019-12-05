import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/courses";

function courseUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCourses() {
  return http.get(apiEndpoint);
}

export function getCourse(courseId) {
  return http.get(courseUrl(courseId));
}

export function saveCourse(course) {
  if (course._id) {
    const body = { ...course };
    delete body._id;
    return http.put(courseUrl(course._id), body);
  }

  return http.post(apiEndpoint, course);
}

export function deleteCourse(courseId) {
  return http.delete(courseUrl(courseId));
}

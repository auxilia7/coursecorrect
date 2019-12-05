import http from "./httpService";
import { apiUrl } from "../config.json";

export function getSubjects() {
  return http.get(apiUrl + "/subjects");
}

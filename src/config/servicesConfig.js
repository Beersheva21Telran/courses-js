import CoursesArray from "../services/courses-array";
import CoursesRest from "../services/courses-rest";
const URL = "http://localhost:3500/courses"
export const courseProvider = new CoursesRest(URL);
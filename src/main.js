import "bootstrap/dist/css/bootstrap.min.css";
 import "bootstrap/dist/js/bootstrap.bundle";
 import { getRandomElement, getRandomInteger } from "./util/random"; 
 import courseData from "./config/courseData.json";
import Colledge from "./services/colledge";
import { courseProvider } from "./config/servicesConfig";
const N_RANDOM_COURSES = 20;
 const colledge = new Colledge(courseProvider, courseData);
 createRandomCourses();
 debugDisplayColledge();
 function createRandomCourses() {
     //TODO creates random courses and adds them to colledge
 }
 function debugDisplayColledge() {
     //TODO display out JSON lines
 }


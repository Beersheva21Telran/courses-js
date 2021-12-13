import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { getRandomElement, getRandomInteger, getRandomDate } from "./util/random";
import courseData from "./config/courseData.json";
import Colledge from "./services/colledge";
import { courseProvider } from "./config/servicesConfig";
import createCourse from "./models/Course";
const N_RANDOM_COURSES = 20;
const colledge = new Colledge(courseProvider, courseData);
createRandomCourses();
debugDisplayColledge();
function createRandomCourses() {
    const { minCost, maxCost, minHours, maxHours, minYear, maxYear, courseNames, lecturers, types, timing } = { ...courseData };
    for (let i = 0; i < N_RANDOM_COURSES; i++) {
        const name = courseNames[getRandomInteger(0, courseNames.length - 1)];
        const lecture = lecturers[getRandomInteger(0, lecturers.length - 1)];
        const hours = getRandomInteger(minHours, maxHours);
        const cost = getRandomInteger(minCost, maxCost);
        const type = getRandomElement(types);
        const dayEveningId = getRandomInteger(0, 2);
        const dayEvening = dayEveningId < 2 ? [timing[dayEveningId]] : timing;
        const startDate = getRandomDate(minYear, maxYear);
        const course = createCourse(name, lecture, hours, cost, type, dayEvening, startDate);
        colledge.addCourse(course);
    }
}
function debugDisplayColledge() {
    colledge.getAllCourses().forEach(element => {
        console.log(JSON.stringify(element));
    });
}




import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { getRandomElement, getRandomInteger, getRandomDate } from "./util/random";
import courseData from "./config/courseData.json";
import Colledge from "./services/colledge";
import { courseProvider } from "./config/servicesConfig";
import createCourse from "./models/Course";
import FormHandler from "./ui/form-handler";
import TableHandler from "./ui/table-handler";
const N_RANDOM_COURSES = 5;
const colledge = new Colledge(courseProvider, courseData);
window.removeCourse = function (id) {
    if (confirm(`you are going to remove course with id=${id}`)) {
        colledge.removeCourseById(id);
        tableCourses.removeRow(id);
    }
}
createRandomCourses();

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

 const formCourse = new FormHandler("course-form","alert-place");
const coursesSort = function (key) {
    tableCourses.clear();
    colledge.sort(key).forEach(c => tableCourses.addRow(c, c.id));
}
const tableCourses = new TableHandler("courses-header", "courses-body",
    ["id", "courseName", "lecturerName", "hours", "cost", "openDate"], coursesSort, "removeCourse");
debugDisplayColledge();
debugDisplayColledge();


FormHandler.fillOptions("course-name", courseData.courseNames);
FormHandler.fillOptions("lecturer-name", courseData.lecturers);
formCourse.addHandler(course => {
    colledge.addCourse(course);
    tableCourses.addRow(course, course.id);
})

function debugDisplayColledge() {

    colledge.getAllCourses().forEach(element => {
        console.log(JSON.stringify(element));
        tableCourses.addRow(element, element.id);

    });
}
const getIntervalHours = function (interval) {
    tableIntervalHours.clear();
    let arr = colledge.getElementsByHours(interval);
    arr.forEach(c => tableIntervalHours.addRow(c));
}

const formHoursStatistics = new FormHandler("hours-statistics-form");
FormHandler.fillOptions("select-hours", courseData.hoursDivider);
formHoursStatistics.addHandler(getIntervalHours);
const tableIntervalHours = new TableHandler("interval-hours-header", "interval-hours-body", ["minInterval", "maxInterval", "amount"]);


const getIntervalCost = function (interval) {
    tableIntervalcost.clear();
    let arr = colledge.getElementsByCost(interval);
    arr.forEach(c => tableIntervalcost.addRow(c));
}

const formCostStatistics = new FormHandler("cost-statistics-form");
FormHandler.fillOptions("select-cost", courseData.costDivider);
formCostStatistics.addHandler(getIntervalCost);
const tableIntervalcost = new TableHandler("interval-cost-header", "interval-cost-body", ["minInterval", "maxInterval", "amount"]);










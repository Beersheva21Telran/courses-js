import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { getRandomElement, getRandomInteger, getRandomDate } from "./util/random";
import courseData from "./config/courseData.json";
import Colledge from "./services/colledge";
import { courseProvider } from "./config/servicesConfig";
import getCourse from "./models/Course";
import FormHandler from "./ui/form-handler";
import TableHandler from "./ui/table-handler";
import Spinner from "./ui/spinner";
import Navigator from "./ui/navigator";
const N_RANDOM_COURSES = 5;
const NAVIGATOR_ID = 'nav-tab';
const COURSES_TAB_ID = 'course-table-tab';
/*************************************************** */
//Creating required objects
const colledge = new Colledge(courseProvider, courseData);
const formCourse = new FormHandler("course-form", "alert-place");
const formCostStatistics = new FormHandler("cost-statistics-form");
const formHoursStatistics = new FormHandler("hours-statistics-form");
const tableCourses = new TableHandler("courses-header", "courses-body",
    ["id", "courseName", "lecturerName", "hours", "cost", "openDate"], coursesSort, "removeCourse");
const tableIntervalcost = new TableHandler("interval-cost-header", "interval-cost-body",
    ["minInterval", "maxInterval", "amount"]);
const tableIntervalHours = new TableHandler("interval-hours-header", "interval-hours-body",
    ["minInterval", "maxInterval", "amount"]);
const spinner = new Spinner("spinner");
let coursesState = '';
const navigator = new Navigator(NAVIGATOR_ID);
/****************************************************************** */
//functions
async function waitWithSpinner(awaitFunc) {
    spinner.start();
    let res;
    try {
        res = await awaitFunc();
    } finally {
        spinner.stop();
    }

    return res;
}
async function createRandomCourses() {
    const courses = await colledge.getAllCourses();
    if (courses.length == 0) {
        const { minCost, maxCost, minHours, maxHours, minYear, maxYear, courseNames, lecturers, types, timing } = { ...courseData };
        for (let i = 0; i < N_RANDOM_COURSES; i++) {
            const course = await createCourse(courseNames, lecturers, minHours, maxHours, minCost, maxCost, types, timing, minYear, maxYear);
            tableCourses.addRow(course);
        }
    } else {
        coursesState = JSON.stringify(courses);
        displayCourses(courses);
    }

}
window.removeCourse = async function (id) {
    if (confirm(`you are going to remove course with id=${id}`)) {
        try {
            await waitWithSpinner(colledge.removeCourseById.bind(colledge, id));
            tableCourses.removeRow(id);
        } catch (err) {
            //TODO Alert functionality
        }

    }
}
async function coursesSort(key) {
    tableCourses.clear();
    const sortedColledge = await waitWithSpinner(colledge.sort.bind(colledge, key));
    sortedColledge.forEach(c => tableCourses.addRow(c, c.id));
}
async function createCourse(courseNames, lecturers, minHours, maxHours, minCost, maxCost, types, timing, minYear, maxYear) {
    const name = courseNames[getRandomInteger(0, courseNames.length - 1)];
    const lecture = lecturers[getRandomInteger(0, lecturers.length - 1)];
    const hours = getRandomInteger(minHours, maxHours);
    const cost = getRandomInteger(minCost, maxCost);
    const type = getRandomElement(types);
    const dayEveningId = getRandomInteger(0, 2);
    const dayEvening = dayEveningId < 2 ? [timing[dayEveningId]] : timing;
    const startDate = getRandomDate(minYear, maxYear);
    const course = getCourse(name, lecture, hours, cost, type, dayEvening, startDate);
    return await colledge.addCourse(course);
}

 function displayCourses(courses) {
    tableCourses.clear();
    courses.forEach(element => {

        tableCourses.addRow(element, element.id);

    });
}
async function getIntervalHours(interval) {
    tableIntervalHours.clear();
    let arr = await waitWithSpinner(colledge.getElementsByHours.bind(colledge, interval));
    arr.forEach(c => tableIntervalHours.addRow(c));
}
async function getIntervalCost(interval) {
    tableIntervalcost.clear();
    let arr = await waitWithSpinner(colledge.getElementsByCost.bind(colledge, interval));
    arr.forEach(c => tableIntervalcost.addRow(c));
}
async function poller() {
    //FIXME we don't need always to request data from server
    if (isCoursesListActive()) {
        const courses = await colledge.getAllCourses();
    const coursesCurrentState = JSON.stringify(courses);
    if (coursesState !== coursesCurrentState) {
        coursesState = coursesCurrentState;
        displayCourses(courses);
    }
    }
    

}
function isCoursesListActive(){
    return navigator.getActiveTab() === COURSES_TAB_ID ;
}

/****************************************************************/
// Actions
createRandomCourses();
FormHandler.fillOptions("course-name", courseData.courseNames);
FormHandler.fillOptions("lecturer-name", courseData.lecturers);
formCourse.addHandler(async course => {
    await waitWithSpinner(colledge.addCourse.bind(colledge, course));
    tableCourses.addRow(course, course.id);
})
setInterval(poller, courseData.pollerInterval);




FormHandler.fillOptions("select-hours", courseData.hoursDivider);
formHoursStatistics.addHandler(getIntervalHours);






FormHandler.fillOptions("select-cost", courseData.costDivider);
formCostStatistics.addHandler(getIntervalCost);











import { getRandomInteger } from "../util/random"
export default class Colledge {
    #coursesProvider;
    #courseData;
    constructor(coursesProvider, courseData) {
        this.#coursesProvider = coursesProvider;
        this.#courseData = courseData;
    }
    addCourse(course) {
        course.hours = +course.hours;
        course.cost = +course.cost;
        course.openDate = new Date(course.openDate);
        if (!this.#validate(course)) {
            return null;
        }
        const id = this.#getId();
        course.id = id;
        this.#coursesProvider.add(course)


    }
    #validate(course) {
        const { minCost, maxCost, minHours, maxHours, minYear, maxYear, courseNames, lecturers, types, timing } = { ...this.#courseData };
        let { courseName, lecturerName, hours, cost, type, dayEvening, openDate } = { ...course };
        const year = openDate.getFullYear();
        const checkName = courseNames.includes(courseName);
        const checkLecturer = lecturers.includes(lecturerName);
        const checkHours = (hours >= minHours && hours <= maxHours);
        const checkCost = (cost >= minCost && cost <= maxCost);
        const checkType = types.includes(type);
        dayEvening = dayEvening.filter(e => timing.includes(e));
        const checkDayEvening = (dayEvening.length > 0 && dayEvening.length <= timing.length);
        const checkStartDate = (year >= minYear && year <= maxYear);

        let strError = '';
        strError += !checkName ? `Incorrect course name, please select one option from the list. ` : '';
        strError += !checkLecturer ? `Incorrect lecture name, please select one option from the list. ` : '';
        strError += !checkHours ? `Incorrect hours, need a number in the range ${minHours} - ${maxHours}. ` : '';
        strError += !checkCost ? `Incorrect cost, need a number in the range ${minCost} - ${maxCost}. ` : '';
        strError += !checkStartDate ? `Incorrect open date, need a date in the range ${minYear} - ${maxYear}. ` : '';
        strError += !checkType ? `Incorrect type, need to choose one of the options. ` : '';
        strError += !checkDayEvening ? `Incorrect timing, please select options from the suggested ones. ` : '';
        if (strError.length > 0) {
            throw strError;
        }
        return true;
    }

    #getId() {
        let randomId;
        do {
            randomId = getRandomInteger(this.#courseData.minId, this.#courseData.maxId);
        } while (this.#coursesProvider.exists(randomId))
        return randomId;
    }
    getAllCourses() {
        return this.#coursesProvider.get();
    }
    sort(key) {
        return _.sortBy(this.getAllCourses(), key)
    }
}
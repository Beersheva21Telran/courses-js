import {getRandomInteger} from "../util/random"
export default class Colledge {
    #coursesProvider;
    #courseData;
    constructor(coursesProvider, courseData) {
        this.#coursesProvider = coursesProvider;
        this.#courseData = courseData;
    }
    addCourse(course) {
        if (!this.#validate(course)) {
            return null;
        }
        const id = this.#getId();
        course.id = id;
        this.#coursesProvider.add(course)


    }
    #validate(course) {
        const { minCost, maxCost, minHours, maxHours, minYear, maxYear, courseNames, lecturers, types, timing } = this.#courseData
        const { cost, hours, openDate, courseName, lecturerName, dayEvening, type } = course
        const checkCost = cost >= minCost && cost <= maxCost
        const checkHours = hours >= minHours && hours <= maxHours
        const checkYear = openDate.getFullYear() >= minYear && openDate.getFullYear() <= maxYear

        const checkName = courseNames.includes(courseName)
        const checkLecturer = lecturers.includes(lecturerName)
        const checkType = types.includes(type)
        const checkTiming = (() => {
           if (dayEvening.length  == 0 || dayEvening.length > timing.length) {
               return false;
           }
           for (let dy of dayEvening) {
                if (!timing.includes(dy)) {
                    return false;
                }
           }
           return true;
        })();

        let strError = ""

        strError += !checkCost ? `incorrect cost - ${cost}\n` : ''
        strError += !checkHours ? `incorrect hours - ${hours}\n` : ''
        strError += !checkYear ? `incorrect openDate - ${openDate}\n` : ''
        strError += !checkName ? `incorrect course name - ${courseName}\n` : ''
        strError += !checkLecturer ? `incorrect lecturer - ${lecturerName}\n` : ''
        strError += !checkType ? `incorrect type of course - ${type}\n` : ''
        strError += !checkTiming ? `incorrect timing - ${dayEvening}\n` : ''

        if (strError) {
            throw strError;
        }
        return true
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
}
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
        const id = this.#getId() ;
        course.id = id;
        this.#coursesProvider.add(course)
       

    }
    #validate(course) {
        //TODO validate course against the courseData object
    }
    #getId () {
        //TODO provides an unique random id value
    }
    getAllCourses() {
        return this.#coursesProvider.get();
    }
}
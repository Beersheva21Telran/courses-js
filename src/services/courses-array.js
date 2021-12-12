class CoursesArray {
    constructor() {
        this.courses = [];
    }

    add(course) {
        this.courses.push(course);
    }

    remove(id) {
        let index = this.get(id)
            ;
        this.courses.splice(index, 1);
    }

    get(id) {
        if (id == undefined) { return this.courses; }
        let index = this.courses.findIndex((e) => e.id == id);
        return this.courses[index];
    }

    update(id, newCourse) {
        let index = this.get(id)
            ;
        this.courses[index] = newCourse;
    }

    exists(id) {
        return this.get(id)
            != null ? true : false;
    }
}
export default CoursesArray;
export default class CoursesRest {
    #url;
    constructor(url) {
        if (!url) {
            throw "URL is not provided";
        }
        this.#url = url;
    }
    async add(course) {
        const response = await fetch(this.#url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(course)
        })
        return await response.json();
    }

    async remove(id) {
        const response = await fetch(this.#getUrlId(id), {
            method: 'DELETE'
        });
        return await response.json();
    }

    async get(id) {
        const url = id != undefined ? this.#getUrlId(id) : this.#url;
        const response = await fetch(url);
        return await response.json();
    }

    #getUrlId(id) {
        return `${this.#url}/${encodeURIComponent(id)}`;
    }


    async update(id, newCourse) {
        const response = await fetch(this.#getUrlId(id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCourse)
        });
        return await response.json();
    }

    async exists(id) {

    }
}
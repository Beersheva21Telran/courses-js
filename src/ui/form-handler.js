function createObject(obj, element) {
    switch (element.type) {
        case "radio": if (element.checked) {
            obj[element.name] = element.value;
        }; break;
        case "checkbox": if (!obj[element.name]) {
            obj[element.name] = [];
        }; if (element.checked) {
            obj[element.name].push(element.value);
        }; break;
        default: obj[element.name] = element.value;
    }
    return obj;
}

function getOptions(options) {
    return options.map(o => `<option value="${o}">${o}</option>`).join('');
}
export default class FormHandler {
    #formElement
    #alertElement
    #inputElements
    constructor(idForm, idAlert) {
        this.#formElement = document.getElementById(idForm);
        if (!this.#formElement) {
            throw "wrong form id";
        }
        if (idAlert) {
            this.#alertElement = document.getElementById(idAlert);
        }
        this.#inputElements = document.querySelectorAll(`#${idForm} [name]`);
        if (!this.#inputElements || this.#inputElements.length == 0) {
            throw "Wrong form content"
        }
        this.#inputElements = Array.from(this.#inputElements); //conversion to Array from NodeList

    }
    addHandler(handlerFn) {
        this.#formElement.addEventListener('submit', this.#onSubmit.bind(this, handlerFn))
    }
    static fillOptions(idSelect, options) {
        const selectElement = document.getElementById(idSelect);
        if (!selectElement) {
            throw "Wrong select id";
        }
        selectElement.innerHTML += getOptions(options);
    }
    async #onSubmit(handlerFn, event) {
        event.preventDefault();
        const obj = this.#inputElements.reduce(createObject, {});
        try {
            await handlerFn(obj);
            this.#formElement.reset();
            this.#alertElement.innerHTML = '';
        } catch (err) {
            const alert = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error!</strong> ${err}.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
            this.#alertElement.innerHTML = alert;
        }

    }

}
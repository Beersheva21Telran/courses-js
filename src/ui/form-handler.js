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

    }
}
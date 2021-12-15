function fillTableHeader(headerElement, keys, sortFn){
    headerElement.innerHTML = getColumns(keys, sortFn);
}
function getColumns(keys, sortFnName) {
    return keys.map(key => {
        return !sortFnName ? `<th>${key}</th>` :
         `<th style="cursor: pointer" >${key}</th>`
    }).join('');
}
export default class TableHandler {
    #keys //fields of being displayed object
    #bodyElement
    constructor(idHeader, idBody, keys, sortFn) {
        this.#keys = keys;
        const headerElement = document.getElementById(idHeader);
        if(!headerElement) {
            throw "Wrong Table Header"
        }
        this.#bodyElement = document.getElementById(idBody);
        if(!this.#bodyElement) {
            throw "Wrong Table Body Placeholder"
        }
        fillTableHeader(headerElement, keys, sortFn);
        if (sortFn) {
            const columnsEl = document.querySelectorAll(`#${idHeader} th`);
            columnsEl.forEach(c => c.addEventListener('click',
             sortFn.bind(this, c.textContent)))

        }
    }
    clear() {
        this.#bodyElement.innerHTML = '';
    }
    addRow(obj, id) {
        this.#bodyElement.innerHTML += `<tr id="${id}">${this.#getRecordData(obj)}</tr>`
    }
    #getRecordData(obj) {
        return this.#keys.map(k => `<td>${obj[k].constructor.name === "Date" ? obj[k].toISOString().substr(0,10) : obj[k].toString()}</td>`).join('');
    }
}
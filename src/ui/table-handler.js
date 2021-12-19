function fillTableHeader(headerElement, keys, sortFn, removeFn) {
    headerElement.innerHTML = getColumns(keys, sortFn, removeFn);
}
function getColumns(keys, sortFnName, removeFn) {
    const ths = keys.map(key => {
        return !sortFnName ? `<th>${key}</th>` :
            `<th style="cursor: pointer" >${key}</th>`
    });
    if (removeFn) {
        ths.push("<th></th>");
    }
    return ths.join('');
}
export default class TableHandler {
    #keys //fields of being displayed object
    #bodyElement
    #removeFunc
    constructor(idHeader, idBody, keys, sortFn, removeFn) {
        this.#keys = keys;
        this.#removeFunc = removeFn;
        const headerElement = document.getElementById(idHeader);
        if (!headerElement) {
            throw "Wrong Table Header"
        }
        this.#bodyElement = document.getElementById(idBody);
        if (!this.#bodyElement) {
            throw "Wrong Table Body Placeholder"
        }
        fillTableHeader(headerElement, keys, sortFn, removeFn);
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
        this.#bodyElement.innerHTML += `<tr id="${id}">${this.#getRecordData(obj, id)}</tr>`
       
    }
    #getRecordData(obj, id) {
        const tds = this.#keys.map(k => `<td>${obj[k].constructor.name === "Date" ? obj[k].toISOString().substring(0, 10)
            : obj[k].toString()}</td>`);
        if (this.#removeFunc) {
            const tdRemove = `<td><button type="button" class="btn-close"  onclick="${this.#removeFunc}('${id}')" id="btn-${id}" ></button></td>`;
            tds.push(tdRemove);

        }
        return tds.join("");

    }
    removeRow(id) {
        document.getElementById(id).remove();
    }

}


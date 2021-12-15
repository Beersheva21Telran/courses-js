function fillTableHeader(headerElement, keys, sortFn){
    headerElement.innerHTML = getColumns(keys, sortFn);
}
function getColumns(keys, sortFnName) {
    return keys.map(key => {
        return !sortFnName ? `<th>${key}</th>` :
         `<th style="cursor: pointer" onclick="${sortFnName}('${key}')">${key}</th>`
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
    }
}
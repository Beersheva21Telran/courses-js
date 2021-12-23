export default class Navigator {
    #navigatorId;

    constructor(idNavigator) {
        this.#navigatorId = idNavigator;
    }

    getActiveTab() {
        const nav = document.querySelector(`#${this.#navigatorId} .active`);

        return nav?.id;
    }

    isTabActive(navId) {
        const coursesTab = document.getElementById(navId);
        return coursesTab?.classList.contains('active');
    }
}
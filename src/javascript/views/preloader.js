class Preloader {
    constructor() {
        this.container = document.querySelector(".preloader-container");
    }

    renderPreloader() {
        this.clearPreloader();
        const preloader = Preloader.preloaderTemplate();
        this.container.insertAdjacentHTML("afterbegin", preloader);
    }

    clearPreloader() {
        this.container.innerHTML = "";
    }

    static preloaderTemplate() {
        return `
        <div class="progress">
            <div class="indeterminate"></div>
        </div>
      `;
    }
}

const preloader = new Preloader();

export default preloader;

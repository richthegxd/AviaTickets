import "../style/main.css";
import "./plugins/index.js";
import locations from "./store/locations.js";
import formUI from "./views/form.js";
import currencyUI from "./views/currency.js";
import ticketsUI from "./views/tickets.js";
import preloader from "./views/preloader.js";

document.addEventListener("DOMContentLoaded", () => {
    initApp();
    const form = formUI.form;

    // Events
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    // Handlers
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }

    async function onFormSubmit() {
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const departDate = formUI.departDateValue;
        const returnDate = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;

        console.log(
            `Город посадки: ${origin}\nГород высадки: ${destination}\nДата отбытия: ${departDate}\nДата возвращения: ${returnDate}\nВалюта: ${currency}`
        );

        preloader.renderPreloader();

        await locations.fetchTickets({
            origin,
            destination,
            departDate,
            returnDate,
            currency,
        });

        console.log(locations.lastSearch);

        preloader.clearPreloader();

        ticketsUI.renderTickets(locations.lastSearch);
    }
});

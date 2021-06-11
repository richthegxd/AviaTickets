import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

// Init select
const select = document.querySelectorAll('select');
M.FormSelect.init(select);

function getSelectInstance(el) {
    return M.FormSelect.getInstance(el);
}

// Init autocomplete
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete);

function getAutocompleteInstance(el) {
    return M.Autocomplete.getInstance(el);
}

// Init datepicker
const datepicker = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepicker, {
    autoClose: true,
    showClearBtn: true,
    format: "yyyy-mm"
});

function getDatepickerInstance(el) {
    return M.Datepicker.getInstance(el);
}

export { getSelectInstance, getAutocompleteInstance, getDatepickerInstance};
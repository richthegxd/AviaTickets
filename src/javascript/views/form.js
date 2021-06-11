import {
    getAutocompleteInstance,
    getDatepickerInstance,
} from "../plugins/materialize.js";



class FormUI {
    constructor(autocompleteInstance, datepickerInstance) {
        this._form = document.forms["locationControls"];
        this.origin = document.querySelector("#autocomplete-origin");
        this.destination = document.querySelector("#autocomplete-destination");
        this.depart = document.querySelector("#datepicker-depart");
        this.return = document.querySelector("#datepicker-return");
        this.originAutocomplete = autocompleteInstance(this.origin);
        this.destinationAutocomplete = autocompleteInstance(this.destination);
        this.departDatepicker = datepickerInstance(this.depart);
        this.returnDatepicker = datepickerInstance(this.return);
    }

    get form() {
        return this._form;
    }

    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get departDateValue() {
        return this.departDatepicker.toString();
    }

    get returnDateValue() {
        return this.returnDatepicker.toString();
    }

    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUI = new FormUI(getAutocompleteInstance, getDatepickerInstance);

export default formUI;

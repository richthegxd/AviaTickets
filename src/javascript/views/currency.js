class CurrencyUI {
    constructor() {
        this.currency = document.querySelector("#currency");
        this.dictionary = {
            USD: "$",
            EUR: "€",
            RUB: "₽"
        }
    }

    get currencySymbol() {
        return this.dictionary[this.currencyValue]
    }

    get currencyValue() {
        return this.currency.value;
    }
}


const currencyUI = new CurrencyUI();

export default currencyUI;
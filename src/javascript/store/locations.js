import api from "../services/apiService.js";
import { formatDate } from "../helpers/date.js";

class Locations {
    constructor(api, helpers) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
        this.airlines = null;
        this.lastSearch = null;
        this.formatDate = helpers.formatDate;
    }
    async init() {
        const res = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines(),
        ]);

        const [countries, cities, airlines] = res;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        this.airlines = this.serializeAirlines(airlines);

        return res;
    }

    createShortCitiesList(cities) {
        return Object.entries(cities).reduce((acc, [, city]) => {
            acc[city.fullName] = null;
            return acc;
        }, {});
    }

    serializeCountries(countries) {
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }

    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            const countryName = this.getCountryNameByCityCode(
                city.country_code
            );
            const cityName = city.name || city.name_translations.en;
            const fullName = `${cityName}, ${countryName}`;
            acc[city.code] = {
                ...city,
                countryName,
                fullName,
            };
            return acc;
        }, {});
    }

    serializeAirlines(airlines) {
        return airlines.reduce((acc, airline) => {
            airline.logo = `http://pics.avs.io/200/200/${airline.code}.png`;
            airline.name = airline.name || airline.name_translations.en;
            acc[airline.code] = airline;
            return acc;
        }, {});
    }

    getCountryNameByCityCode(code) {
        return this.countries[code].name;
    }

    getCityCodeByKey(key) {
        const city = Object.values(this.cities).find(
            (item) => item.fullName === key
        );
        return city.code;
    }

    getCityNameByCode(code) {
        return this.cities[code].name;
    }

    getAirlineNameByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : "";
    }

    getAirlineLogoByCode(code) {
        return this.airlines[code] ? this.airlines[code].logo : "";
    }

    async fetchTickets(params) {
        const res = await this.api.prices(params);
        this.lastSearch = this.serializeTickets(res.data);
    }

    serializeTickets(tickets) {
        return Object.values(tickets).map((ticket) => {
            return {
                ...ticket,
                originName: this.getCityNameByCode(ticket.origin),
                destinationName: this.getCityNameByCode(ticket.destination),
                airlineLogo: this.getAirlineLogoByCode(ticket.airline),
                airlineName: this.getAirlineNameByCode(ticket.airline),
                departureAt: this.formatDate(ticket.departure_at,"dd MMM yyyy hh:mm"),
                returnAt: this.formatDate(ticket.return_at,"dd MMM yyyy hh:mm"),
            };
        });
    }
}

const locations = new Locations(api, { formatDate });

export default locations;

import currencyUI from "./currency";

class TicketsUI {
    constructor() {
        this.container = document.querySelector(".tickets-section .row");
    }

    renderTickets(tickets) {
        this.clearContainer();

        if (!tickets.length) {
            this.showEmptyMessage();
            return;
        }

        let fragment = "";

        const resultTextTemplate = TicketsUI.resultTextTemplate();
        fragment += resultTextTemplate;

        tickets.forEach((ticket) => {
            const template = TicketsUI.ticketTemplate(ticket);
            fragment += template;
        });

        this.container.insertAdjacentHTML("afterbegin", fragment);
    }

    clearContainer() {
        this.container.innerHTML = "";
    }

    showEmptyMessage() {
        const template = TicketsUI.emptyMessageTemplate();
        this.container.insertAdjacentHTML("afterbegin", template);
    }

    static resultTextTemplate() {
        return `
        <div class="tickets-empty-res-msg">
            Found tickets for your request:
        </div> 
        `
    }
    static emptyMessageTemplate() {
        return `
        <div class="tickets-empty-res-msg">
            No tickets were found for your request.
        </div> 
        `;
    }

    static ticketTemplate(ticket) {
        return `
        <div class="col s12 m6">
            <div class="card ticket-card">
              <div class="ticket-airline d-flex align-items-center">
                <img
                  src="${ticket.airlineLogo}"
                  class="ticket-airline-img"
                />
                <span class="ticket-airline-name"
                  >${ticket.airlineName}</span
                >
              </div>
              <div class="ticket-destination d-flex align-items-center">
                <div class="d-flex align-items-center mr-auto">
                  <span class="ticket-city">${ticket.originName}</span>
                  <i class="medium material-icons">flight_takeoff</i>
                </div>
                <div class="d-flex align-items-center">
                  <i class="medium material-icons">flight_land</i>
                  <span class="ticket-city">${ticket.destinationName}</span>
                </div>
              </div>
              <div class="ticket-time-price d-flex align-items-center">
                <span class="ticket-time-departure">${ticket.departureAt}</span>
                <span class="ticket-price ml-auto">${currencyUI.currencySymbol}${ticket.price}</span>
              </div>
              <div class="ticket-additional-info">
                <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
              </div>
            </div>
        </div> 
        `;
    }
}

const ticketsUI = new TicketsUI();

export default ticketsUI;

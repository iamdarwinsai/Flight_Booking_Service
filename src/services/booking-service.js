const { BookingRepository } = require("../repository/index");
const axios = require("axios");

const { ServiceError } = require("../utils/errors/index");
const { FLIGHT_URL, BINDING_KEY } = require("../config/serverConfig");
const { createChannel, publishMessage } = require("../utils/messageQueues");
class BookingService {
  constructor() {
    this.bookingRepo = new BookingRepository();
  }

  async create(data) {
    try {
      const { flightId, noOfSeats } = data;
      // http://localhost:3500/api/v1/flights/13
      const getFlightURL = `${FLIGHT_URL}/api/v1/flights/${flightId}`;
      const getFlightData = await axios.get(getFlightURL);
      const getFlightObj = getFlightData.data.data;
      console.log(getFlightObj);
      if (getFlightObj.totalSeats < noOfSeats) {
        throw new ServiceError("Something went wrong while booking");
      }
      const totalCost = getFlightObj.price * noOfSeats;

      const payload = { ...data, totalCost };
      console.log(payload);
      const booking = await this.bookingRepo.create(payload);
      const updateFlightURL = `${FLIGHT_URL}/api/v1/flights/${flightId}`;
      console.log("FLight update req url", updateFlightURL);
      await axios.patch(updateFlightURL, {
        totalSeats: getFlightObj.totalSeats - booking.noOfSeats,
      });
      const finalBooking = await this.bookingRepo.update(booking.id);
      console.log("FINAL BOOKING OBJ", finalBooking);
      const channel = await createChannel();
      const reminderPayload = {
        data: {
          from: `AIRPLINE@SUPPORTADMIN.COM`,
          to: `ramrom9812@gmail.com`,
          subject: `Hello user we have success fully booked your ticketThis is a reminder of flight status is BOOKED. Enjoy your flight`,
          text: "Enjoy your flight",
        },
        service: "SEND MAIL",
      };
      publishMessage(channel, BINDING_KEY,JSON.stringify(reminderPayload));
      return finalBooking;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;

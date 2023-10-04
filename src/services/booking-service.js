const {BookingRepository}=require("../repository/index") 
const axios = require('axios');

const {ServiceError}=require("../utils/errors/index");
const { FLIGHT_URL } = require("../config/serverConfig");

class BookingService{
    constructor(){
        this.bookingRepo=new BookingRepository();
    }

    async create(data){
        try {
            const{flightId,noOfSeats}=data;
            // http://localhost:3500/api/v1/flights/13
            const getFlightURL=`${FLIGHT_URL}/api/v1/flights/${flightId}`
            const getFlightData=await axios.get(getFlightURL);
            if(getFlightData.data.data.totalSeats<noOfSeats){
                throw new ServiceError("Something went wrong while booking");
            }
            const price=getFlightData.data.data.price*noOfSeats;
            const people=noOfSeats

            const payload={...data,price,people};
            const booking=await this.bookingRepo.create(payload);
            console.log(booking);
            const updateFlightURL=`${getFlightURL}/api/v1/flights/${flightId}`;
            await axios.patch(updateFlightURL,{totalSeats:getFlightData.totalSeats-booking.noOfSeats})
            const finalBooking=await this.bookingRepo.update(booking.id);
            return finalBooking;
        } catch (error) {
            if(error.name=="SequelizeValidationError"){
                throw error
            }
            throw new ServiceError();
        }
    }
}

module.exports=BookingService
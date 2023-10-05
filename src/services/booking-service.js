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
            console.log(data);
            // http://localhost:3500/api/v1/flights/13
            const getFlightURL=`${FLIGHT_URL}/api/v1/flights/${flightId}`
            const getFlightData=await axios.get(getFlightURL);
            const getFlightObj=getFlightData.data.data;
            console.log(getFlightObj);
            if(getFlightObj.totalSeats<noOfSeats){
                throw new ServiceError("Something went wrong while booking");
            }
            const totalCost=getFlightObj.price*noOfSeats;

            const payload={...data,totalCost};
            console.log(payload);
            const booking=await this.bookingRepo.create(payload);
            const updateFlightURL=`${FLIGHT_URL}/api/v1/flights/${flightId}`;
            console.log("FLight update req url",updateFlightURL);
            await axios.patch(updateFlightURL,{totalSeats:getFlightObj.totalSeats-booking.noOfSeats})
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
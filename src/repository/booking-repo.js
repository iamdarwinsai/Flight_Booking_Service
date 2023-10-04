const status = require("http-status");

const {AppError,ValidationError}=require("../utils/errors/index")

const {Booking}=require("../models/index")

class BookingRepository{


    async create(data){
        try {
            const result=await Booking.create({
                flightId:data.flightId,
                userId:data.userID,
                noOfSeats:data.noOfSeats,
                price:data.price,
                people:data.people
            });
            return result;
        } catch (error) {
            if(error.name=="SequelizeValidationError"){
                throw new ValidationError(error)
            }
            throw new AppError("RepositoryErro","Cannot creat booking","Some issue while creating bookin",status.INTERNAL_SERVER_ERROR)
        }
    }

    async update(updateId){
        try {
            const value=await Booking.findByPk(updateId);
            value.status="BOOKED"
            await value.save();
            return value;
        } catch (error) {
            throw new AppError(
                "ReposiotryError",
                "something went wrong while updating",
                "Not able to update the booking",
                status.INTERNAL_SERVER_ERROR
                )
        }
    }
}


module.exports=BookingRepository;
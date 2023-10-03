const status = require("http-status");

const {AppError,ValidationError}=require("../utils/errors/index")

const {Booking}=require("../models/index")

class BookingRepository{


    async create(data){
        try {
            const result=await Booking.create(data);
            return result;
        } catch (error) {
            if(error.name=="SequelizeValidationError"){
                throw new ValidationError(error)
            }
            throw new AppError("RepositoryErro","Cannot creat booking","Some issue while creating bookin",status.INTERNAL_SERVER_ERROR)
        }
    }
}


module.exports=BookingRepository;
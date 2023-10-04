const {BookingService} = require("../services/index")

const status = require("http-status");

const bookingService = new BookingService();

const create = async (req, res) => {
    try {
        const response=await bookingService.create(req.body);
        return res.status(status.OK).json({
            data:response,
            success:"Pass",
            error:{},
            message:"SucceddFully completed booking"
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            message:error.message,
            success:"fail",
            explanation:error.explanation,
            data:{},
        })
    }
}

module.exports = {
    create
}

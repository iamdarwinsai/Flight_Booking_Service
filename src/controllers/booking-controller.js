const {BookingService} = require("../services/index")

const status = require("http-status");
const { createChannel, publishMessage } = require("../utils/messageQueues");
const { BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {

    constructor(){
        
    }

    async create(req, res) {
        try {
            const response = await bookingService.create(req.body);
            return res.status(status.OK).json({data: response, success: "Pass", error: {}, message: "SuccessFully completed booking"})
        } catch (error) {
            return res.status(error.statusCode).json({message: error.message, success: "fail", explanation: error.explanation, data: {}})
        }
    }

    async sendMessageToQueue(req,res){
        try {
            const channel=await createChannel();
            const data={
                message:"HELLO KID I'm from BOOKING SERVICE"
            }
            publishMessage(channel,BINDING_KEY,JSON.stringify(data))
            return res.status(201).json({
                message:"SENT IN TO THE QUEUE"
            })
        } catch (error) {
            
        }
    }

}



module.exports=BookingController

const express=require("express");
const {BookingController}=require("../../controllers/index")

const bookingController=new BookingController();

const router=express.Router();

router.post("/bookFlights",bookingController.create);
router.post("/isPublish",bookingController.sendMessageToQueue)

module.exports=router
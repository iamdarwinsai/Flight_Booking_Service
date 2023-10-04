const express=require("express");

const router=express.Router();

const {BookingController}=require("../../controllers/index")


router.post("/bookFlights",BookingController.create);

module.exports=router
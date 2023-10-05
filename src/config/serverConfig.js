const dotenv=require("dotenv")

dotenv.config()

module.exports={
    PORT:process.env.PORT,
    FLIGHT_URL:process.env.FLIGHT_URL,
    MESSAGE_BROKER_URL:process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME:process.env.EXCHANGE_NAME,
    BINDING_KEY:process.env.BINDING_KEY,
}
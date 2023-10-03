const status=require("http-status")

class ServiceError extends Error{

    constructor(
        name="ServiceError",
        explanantion="Error in service layer",
        message="Something went wrong",
        statusCode=status.INTERNAL_SERVER_ERROR
    ){
        super();
        this.name=name,
        this.explanantion=explanantion,
        this.message=message,
        this.statusCode=statusCode
    }
}

module.exports=ServiceError
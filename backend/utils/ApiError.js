class ApiError extends Error
{
constructor(
statusCode,
message="Error occured",
)
{
super(message);
this.statusCode=statusCode;
this.data=null;
this.message=message;
this.success=false;
}
}

export {ApiError}
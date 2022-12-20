export const errorResponse = (statusCode, errMsg) => ({
    status: statusCode || 500,
    message: errMsg || "internal server error",
    timestamp: `${new Date().getFullYear(   `1`)}-${new Date().getMonth()}-${new Date().getDate()}`
});

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json(errorResponse(statusCode, err.message));
};


//200 OK
//201 Created
//202 Accepted
//204 No Content

//400 Bad Request
//401 Unauthorized
//403 Forbidden
//404 Not Found

//500 Internal Server Error
//503 Sevice Unavailable


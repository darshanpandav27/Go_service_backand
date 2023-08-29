class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.message = msg;
    }
    static alreadyExist(message) {
        return new CustomErrorHandler(message);
    }
    static wrongCredentials(message = 'Username or password is wrong!') {
        return new CustomErrorHandler(message);
    }
    static unAuthorized(message = 'unAuthorized') {
        return new CustomErrorHandler(message);
    }
    static notFound(message = '404 Not Found') {
        return new CustomErrorHandler(message);
    }
    static serverError(message = 'Internal server error') {
        return new CustomErrorHandler(message);
    }
}

export default CustomErrorHandler;
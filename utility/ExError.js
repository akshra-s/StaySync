class ExError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        this.name = "ExError";
    }
}

module.exports = ExError;
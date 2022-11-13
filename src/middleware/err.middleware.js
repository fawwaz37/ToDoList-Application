class ErrorHandler {
	constructor() {
		this.statusBadRequest = 400;
		this.statusInternalError = 500;
	}

	badRequest(res) {
		return res.status(this.statusBadRequest).send({
			status: res.statusCode,
			message: `Input DATA!`,
		});
	}

	internalError(res) {
		return res.status(this.statusInternalError).send({
			status: res.statusCode,
			message: `Internal Server Error!`,
		});
	}
}

export default ErrorHandler;

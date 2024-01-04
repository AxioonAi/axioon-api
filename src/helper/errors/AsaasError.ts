export class AsaasError extends Error {
	constructor(message = "Ocorreu um erro na entidade de pagamento") {
		super(message);
	}
}

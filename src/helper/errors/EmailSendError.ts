export class EmailSendError extends Error {
	constructor() {
		super(
			"Ocorreu um erro ao enviar o e-mail, tente novamente ou entre em contato com nosso suporte",
		);
	}
}

export class CodeNotFoundError extends Error {
	constructor() {
		super("Código inválido ou expirado");
	}
}

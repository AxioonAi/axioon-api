export class CpfAlreadyExistsError extends Error {
	constructor() {
		super("CPF já cadastrado");
	}
}

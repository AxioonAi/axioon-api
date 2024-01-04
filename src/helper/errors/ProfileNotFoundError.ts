export class ProfileNotFoundError extends Error {
	constructor() {
		super("Perfil não encontrado");
	}
}

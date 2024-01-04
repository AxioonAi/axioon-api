export class WebsiteNotFoundError extends Error {
	constructor() {
		super("Site não encontrado");
	}
}

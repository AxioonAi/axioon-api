export class DataNotFoundError extends Error {
	constructor() {
		super("Não foram encontrados dados para o período selecionado");
	}
}

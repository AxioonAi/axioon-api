export const zodErrorHandler = (error: {
	errors: { path: (string | number)[] }[];
}) => {
	const field = messages.find((m) => m.field === error.errors[0].path[0]);

	return field
		? field.message
		: "Verifique os campos inseridos e tente novamente";
};

export const messages = [
	{
		field: "email",
		message: "Insira um email válido",
	},
	{
		field: "password",
		message: "Insira uma senha valida",
	},
	{
		field: "name",
		message: "Insira um nome valido",
	},
	{
		field: "social_name",
		message: "Insira um nome social válido",
	},
	{
		field: "cpfCnpj",
		message: "Insira um CPF/CNPJ valido",
	},
	{
		field: "mobilePhone",
		message: "Insira um número de telefone válido",
	},
	{
		field: "birth_date",
		message: "Insira uma data de nascimento válida",
	},
	{
		field: "cpf",
		message: "Insira uma CPF válido",
	},
	{
		field: "instagram",
		message: "Insira um instagram valido",
	},
	{
		field: "youtube",
		message: "Insira um youtube valido",
	},
	{
		field: "tiktok",
		message: "Insira um tiktok valido",
	},
	{
		field: "facebook",
		message: "Insira um facebook valido",
	},
	{
		field: "city",
		message: "Insira uma cidade válida",
	},
	{
		field: "state",
		message: "Insira um estado válido",
	},
	{
		field: "role",
		message: "Insira um cargo válido",
	},
	{
		field: "political_group_id",
		message: "Insira um partido politico valido",
	},
	{
		field: "Records",
		message: "Verifique os campos inseridos e tente novamente",
	},
	{
		field: "sex",
		message: "Insira um sexo valido",
	},
	{
		field: "creditCard",
		message: "Insira um cartão de credito",
	},
	{
		field: "creditCardHolderInfo",
		message: "Insira os dados do portador do cartão de credito",
	},
	{
		field: "installmentCount",
		message: "Insira um número de parcelas",
	},
	{
		field: "holderName",
		message: "Insira um nome do portador do cartão de credito",
	},
	{
		field: "number",
		message: "Insira um numero do cartão de credito",
	},
	{
		field: "expiryMonth",
		message: "Insira um mes de expiração do cartão de credito",
	},
	{
		field: "expiryYear",
		message: "Insira um ano de expiração do cartão de credito",
	},
	{
		field: "ccv",
		message: "Insira um ccv do cartão de credito",
	},
	{
		field: "address",
		message: "Insira um endereço válido",
	},
	{
		field: "addressNumber",
		message: "Insira um número válido",
	},
	{
		field: "province",
		message: "Insira um bairro válido",
	},
	{
		field: "postalCode",
		message: "Insira um CEP válido",
	},
	{
		field: "saveCreditCard",
		message: "Selecione se deseja salvar o cartão de credito",
	},
	{
		field: "creditCardToken",
		message: "Escolha um cartão salvo para realizar o pagamento",
	},
	{
		field: "period",
		message: "Insira um período valido",
	},
];

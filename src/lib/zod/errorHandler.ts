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
];

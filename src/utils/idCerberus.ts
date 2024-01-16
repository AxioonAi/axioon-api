import axios from "axios";
import { env } from "process";

export const IdCerberusAPI = (data: { cpf: string; service: string }) => {
	const response = axios
		.post("https://backoffice-hml.idcerberus.com/api/service-api", data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${env}`,
			},
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw new Error(error);
		});

	return response;
};

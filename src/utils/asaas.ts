import dotenv from "dotenv";
import { env } from "process";
import request from "request";
dotenv.config();

interface HttpResponse {
  status: number;
  body: any;
}

export const createConnection = async (data: {
  endpoint: string;
  body?: any;
  method: string;
  key?: string;
}): Promise<HttpResponse> => {
  return new Promise((resolve, reject) => {
    request(
      {
        method: data.method ? data.method : "POST",
        url: ` ${env.ASAAS}${data.endpoint}`,
        headers: {
          access_token: data.key ? data.key : env.ASAAS_KEY,
        },
        body: data.body ? JSON.stringify(data.body) : null,
      },
      function (error, response, body) {
        const status = response.statusCode;
        if (status === 403) {
          return {
            status,
            body: "error",
          };
        }
        const respostaServidor = JSON.parse(body);
        const respostaFinal = {
          status,
          body: respostaServidor,
        };
        resolve(respostaFinal);
      }
    );
  });
};

import dotenv from "dotenv";
import request from "request";
dotenv.config();

interface HttpResponse {
  status: number;
  body: any;
}

export const createConnection = async (
  endpoint: string,
  req?: any,
  method = "POST",
  key = process.env.ASAAS_KEY
): Promise<HttpResponse> => {
  return new Promise((resolve, reject) => {
    request(
      {
        method: method,
        url: ` ${process.env.ASAAS}${endpoint}`,
        headers: {
          access_token: key,
        },
        body: JSON.stringify(req),
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

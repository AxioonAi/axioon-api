import axios from "axios";
import { env } from "process";

export const IdCerberusAPI = (data: { cpf: string; service: string }) => {
  const response = axios
    .post("https://backoffice-hml.idcerberus.com/api/service-api", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpd3NIX3VEWEpMS0tTaHVVUm4yM0tDbW1fdkc3WGpWa254Zkk3dzBhNFlNIn0.eyJleHAiOjE3MjQ3ODE4NjUsImlhdCI6MTcyNDc4MTI2NSwianRpIjoiYzY1NGUzMjQtOGNjOS00YzFlLWFhYzItZjI5ZTQyNmU5YjIzIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmlkY2VyYmVydXMuY29tL2F1dGgvcmVhbG1zL29uYm9hcmRpbmctaG1sIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjAyNGY5MzJmLThhMzAtNDY4YS05Y2ZiLWE3YjMzMjU2MjE5YiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImV4ZWN1dGl2by1kaWdpdGFsIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJST0xFX1JFUE9SVF9PTkJPQVJESU5HIiwiUk9MRV9UT0tFTl9PTkJPQVJESU5HIiwib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLW9uYm9hcmRpbmctaG1sIiwidW1hX2F1dGhvcml6YXRpb24iLCJST0xFX1NFUlZJQ0VfQVBJIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRJZCI6ImV4ZWN1dGl2by1kaWdpdGFsIiwiY2xpZW50SG9zdCI6IjE3Mi4zMS41Ni4xMDUiLCJvcmdhbml6YXRpb24iOiJFeGVjdXRpdm9zIERpZ2l0YWwiLCJyb2xlcyI6WyJST0xFX1JFUE9SVF9PTkJPQVJESU5HIiwiUk9MRV9UT0tFTl9PTkJPQVJESU5HIiwib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLW9uYm9hcmRpbmctaG1sIiwidW1hX2F1dGhvcml6YXRpb24iLCJST0xFX1NFUlZJQ0VfQVBJIl0sInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1leGVjdXRpdm8tZGlnaXRhbCIsImNsaWVudEFkZHJlc3MiOiIxNzIuMzEuNTYuMTA1In0.itBOWQXlSJbaJoWcsc7dxdi4-P_oCHOxA09WbeAZ8eh-mXkjOWfsIEyIxI9BlNHpD656hesEjIjDDfYYBllTv2ZMCIpL7cHFv0goynRMo1bRKQkH7G8wA_LPkQYHZVaD1LQG-YrWbBt68LvxcvyZX-vvm9hj0zcFDzyLrPGgJrZcNW9ItbpunmZ7OJE6a7C2xRHw6mg_jJ2zAF3H8Ip496PCVszpN8oVG8a783tCW_4gwuwRs0gHLz25GJ62BSyifz9AGtGglBWW9PFSS21oAvEswoTFbV1W89tMo9QIrLxqugpxcW2BhgkYN6_HR4rkgBVl9ERJlqIPNu3nx7tvwA`,
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

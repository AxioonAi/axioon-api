import { SignaturePlanRepository } from "@/repositories/SignaturePlanRepository";

interface FindManySignaturePlanUseCaseResponse {
	plans: {
		title: string;
		description: string;
		id: string;
		value: number;
		benefits: {
			name: string;
			description: string;
		}[];
	}[];
}

export class FindManySignaturePlanUseCase {
	constructor(private signaturePlanRepository: SignaturePlanRepository) {}

	async execute(): Promise<FindManySignaturePlanUseCaseResponse> {
		const plans = await this.signaturePlanRepository.findAll();

		const formattedPlans = plans.map((plan) => {
			return {
				title: plan.name,
				description: plan.description,
				id: plan.id,
				value: plan.pixValue,
				benefits: [
					{
						name: "Perfis monitorados",
						description: `${plan.amount_of_monitoring} perfil(is) monitorado(s)`,
					},
					{
						name: "Quantidade de Usuários",
						description: `${plan.amount_of_users} usuário(s)`,
					},
					{
						name: "Monitoramento Jurídico",
						description: plan.legal_data ? "Sim" : "Não",
					},
					{
						name: "Histórico Eleitoral",
						description: plan.electoral_history ? "Sim" : "Não",
					},
					{
						name: "Acesso a I.A Axioon",
						description: plan.ai_access ? "Sim" : "Não",
					},
					{
						name: "Monitoramento de gastos com Anúncios",
						description: plan.facebook_ads_monitoring ? "Sim" : "Não",
					},
					{
						name: "Dados demográficos",
						description: plan.population_data ? "Sim" : "Não",
					},
					{
						name: "Assessoria Política e Tecnológica",
						description: plan.political_accessory ? "Sim" : "Não",
					},
				],
			};
		});

		return { plans: formattedPlans };
	}
}

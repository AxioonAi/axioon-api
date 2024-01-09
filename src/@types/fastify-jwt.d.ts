import "@fastify/jwt";

declare module "@fastify/jwt" {
	export interface FastifyJWT {
		user: {
			sub: string;
			type: string;
			sub_user_id: string;
		};
	}
}

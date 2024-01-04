import { SubUser } from "@prisma/client";

export interface SubUserRepository {
	findByEmail(email: string): Promise<SubUser | null>;
	findByUserId(userId: string): Promise<SubUser[]>;
	create(data: {
		name: string;
		email: string;
		password_hash: string;
		user_id: string;
	}): Promise<SubUser>;
	update(
		id: string,
		data: {
			password_hash?: string;
			active?: boolean;
		},
	): Promise<SubUser>;
	findById: (id: string) => Promise<SubUser | null>;
}

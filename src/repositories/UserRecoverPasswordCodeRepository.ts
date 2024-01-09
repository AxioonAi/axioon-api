import { UserRecoverPasswordCode } from "@prisma/client";

export interface UserRecoverPasswordCodeRepository {
	create(data: { code: string; user_id: string }): Promise<void>;
	findByCode(code: string): Promise<UserRecoverPasswordCode | null>;
}

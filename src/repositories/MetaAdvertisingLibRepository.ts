import { MetaAdvertisingLib } from "@prisma/client";

export interface MetaAdvertisingLibRepository {
	createMany(data: MetaAdvertisingLib[]): Promise<void>;
}

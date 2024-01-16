import { SignaturePlan, Status, UserPlan } from "@prisma/client";

interface FindActivePlanDetails extends UserPlan {
	plan: SignaturePlan;
}

export interface UserPlanRepository {
	create(data: {
		user_id: string;
		plan_id: string;
		paymentId: string;
		status?: Status;
		expires_in: Date;
	}): Promise<UserPlan>;
	findById(id: string): Promise<UserPlan | null>;
	findByUserId(userId: string): Promise<UserPlan[]>;
	findByPlanId(planId: string): Promise<UserPlan[]>;
	findByPaymentId(paymentId: string): Promise<UserPlan | null>;
	findByPaymentIdAndUpdate(
		paymentId: string,
		data: { status: Status },
	): Promise<UserPlan | null>;
	findActivePlan(userId: string): Promise<FindActivePlanDetails | null>;
}

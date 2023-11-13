import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";
import { UserPlanRepository } from "../UserPlanRepository";

export class PrismaUserPlanRepository implements UserPlanRepository {
  async findById(id: string) {
    return await prisma.userPlan.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUserId(userId: string) {
    return await prisma.userPlan.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async findByPlanId(planId: string) {
    return await prisma.userPlan.findMany({
      where: {
        plan_id: planId,
      },
    });
  }

  async findByPaymentId(paymentId: string) {
    return await prisma.userPlan.findUnique({
      where: {
        paymentId: paymentId,
      },
    });
  }

  async findByPaymentIdAndUpdate(paymentId: string, data: { status: Status }) {
    return await prisma.userPlan.update({
      where: {
        paymentId: paymentId,
      },
      data,
    });
  }

  async create(data: {
    user_id: string;
    plan_id: string;
    paymentId: string;
    status?: Status;
    expires_in: Date;
  }) {
    return await prisma.userPlan.create({
      data: {
        ...data,
      },
    });
  }

  async findActivePlan(userId: string) {
    return await prisma.userPlan.findFirst({
      where: {
        user_id: userId,
        status: Status.ACTIVE,
        expires_in: {
          gte: new Date(),
        },
      },
    });
  }
}

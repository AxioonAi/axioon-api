import { z } from "zod";

export const ZodNewCreditCardPaymentBodySchema = z.object({
	creditCard: z.object({
		holderName: z.string(),
		number: z.string(),
		expiryMonth: z.string(),
		expiryYear: z.string(),
		ccv: z.string(),
	}),
	creditCardHolderInfo: z.object({
		name: z.string(),
		email: z.string(),
		cpfCnpj: z.string(),
		postalCode: z.string(),
		addressNumber: z.string(),
		phone: z.string(),
	}),
	saveCreditCard: z.boolean(),
	installmentCount: z.number(),
});

export const ZodExistsCreditCardPaymentBodySchema = z.object({
	installmentCount: z.number(),
	creditCardToken: z.string(),
});

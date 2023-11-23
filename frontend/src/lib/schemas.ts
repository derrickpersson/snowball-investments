import { z } from "zod";

export const registerUserSchema = z.object({
	firstName: z.string().max(140, "Name must be 140 characters or less").min(1, "What should we call you?"),
	lastName: z.string().max(140, "Name must be 140 characters or less").min(1, "We also need your last name!"),
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters"),
});

export const loginUserSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string(),
});



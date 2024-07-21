const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least of 8 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});
// Creating an object schema
const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast 3 chars. " })
    .max(255, { message: "Name must not be more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be atleast 10 characters " })
    .max(20, { message: "Name must not be more than 20 characters " }),
});

module.exports = { signupSchema, loginSchema };

// After defining a validator schema we need a validator middleware which checks for the validity of user input

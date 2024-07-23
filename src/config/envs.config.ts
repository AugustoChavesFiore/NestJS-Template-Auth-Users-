import * as Joi from "joi";

export const EnvsValidationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PORT: Joi.string().required(),
});
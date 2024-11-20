import Joi from "joi";

export const getRideEstimateSchema = Joi.object({
    id: Joi.number().required(),
    origin: Joi.string().required(),
    destination: Joi.string().required(),
});


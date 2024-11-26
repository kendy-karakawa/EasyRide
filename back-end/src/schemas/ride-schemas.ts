import Joi from "joi";

export const getRideEstimateSchema = Joi.object({
    customer_id: Joi.number().required().not(0),
    origin: Joi.string().required(),
    destination: Joi.string().required(),
});

export const rideConfirmSchema = Joi.object({
    customer_id: Joi.number().required(),
    origin: Joi.string().required(),
    destination: Joi.string().required(),
    distance: Joi.number().required(),
    duration: Joi.number().required(),
    driver: Joi.object({ 
        id: Joi.number().required(), 
        name: Joi.string().required() 
      }).required(),
      value: Joi.number().required()
});

export const getRideHistorySchemas = Joi.object({
    customer_id: Joi.number().required()
  });

import {Joi} from 'celebrate';

import * as dotenv from 'dotenv';
dotenv.config();

const envVarsSchema = Joi.object({
    PORT: Joi.number().default(4000),
    MONGO_URI: Joi.string(),
    TOKEN_KEY: Joi.string()
    .required()
    .description('JWT KEY required to sign in')
}).unknown().required();

const {error, value: envVars} = envVarsSchema.validate(process.env);
if(error) {
    throw new Error (`Config validation error: ${error.message}`);
}

export const port = envVars.PORT;
export const tokenKey = envVars.TOKEN_KEY;
export const mongo = {
    host: envVars.MONGO_URI
}


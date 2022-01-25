
import {Joi} from 'celebrate';

import * as dotenv from 'dotenv';
dotenv.config();

const envVarsSchema = Joi.object({
    PORT: Joi.number().default(4000),
    MONGODB_URL: Joi.string(),
}).unknown().required();

const {error, value: envVars} = envVarsSchema.validate(process.env);
if(error) {
    throw new Error (`Config validation error: ${error.message}`);
}

export const port = envVars.PORT;
export const mongo = {
    host: envVars.MONGODB_URL
}


import { celebrate, Joi, Segments } from 'celebrate';

export default class UserValidation {
    static create() {
        const create = {
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
            }),
        };
        return celebrate(create, { abortEarly: false });
    }

    static login() {
        const login = {
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
            }),
        };
        return celebrate(login, { abortEarly: false });
    }
}
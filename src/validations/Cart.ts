import { celebrate, Joi, Segments } from 'celebrate';

export default class CartValidation {
    static create() {
        const create = {
            [Segments.BODY]: Joi.object().keys({
                quantity: Joi.number().required(),
            }),
        };
        return celebrate(create, { abortEarly: false });
    }
}
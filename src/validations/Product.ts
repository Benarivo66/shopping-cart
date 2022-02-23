import { celebrate, Joi, Segments } from 'celebrate';

export default class ProductValidation {
    static create() {
        const create = {
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                image: Joi.binary(),
                description: Joi.string().required(),
                category: Joi.string().required(),
                quantity: Joi.number().required(),
                price: Joi.number().required(),
            }),
        };
        return celebrate(create, { abortEarly: false });
    }
}
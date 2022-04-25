"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
class ProductValidation {
    static create() {
        const create = {
            [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
                name: celebrate_1.Joi.string().required(),
                image: celebrate_1.Joi.binary(),
                description: celebrate_1.Joi.string().required(),
                category: celebrate_1.Joi.string().required(),
                quantity: celebrate_1.Joi.number().required(),
                price: celebrate_1.Joi.number().required(),
            }),
        };
        return celebrate_1.celebrate(create, { abortEarly: false });
    }
}
exports.default = ProductValidation;
//# sourceMappingURL=Product.js.map
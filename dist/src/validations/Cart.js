"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
class CartValidation {
    static create() {
        const create = {
            [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
                quantity: celebrate_1.Joi.number().required(),
            }),
        };
        return celebrate_1.celebrate(create, { abortEarly: false });
    }
}
exports.default = CartValidation;
//# sourceMappingURL=Cart.js.map
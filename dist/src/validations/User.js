"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
class UserValidation {
    static create() {
        const create = {
            [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
                email: celebrate_1.Joi.string().email().required(),
                password: celebrate_1.Joi.string().min(6).required(),
            }),
        };
        return (0, celebrate_1.celebrate)(create, { abortEarly: false });
    }
    static login() {
        const login = {
            [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
                email: celebrate_1.Joi.string().email().required(),
                password: celebrate_1.Joi.string().min(6).required(),
            }),
        };
        return (0, celebrate_1.celebrate)(login, { abortEarly: false });
    }
}
exports.default = UserValidation;
//# sourceMappingURL=User.js.map
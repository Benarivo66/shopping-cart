import {Request, Response, NextFunction} from 'express';
import ProductService from '../services/product';

class ProductController{
    static async create(req: Request, res:Response, next: NextFunction): Promise<Response> {
        try {
            const {name, description, category, quantity, price} = req.body;
            let image;
            if(req.file) image = req.file.path;
            else{
                image = '#';
            }
            const productFields = {
                name, description, category, quantity, price, image, deleted: false
            };

            const errors: string[] = [];
            Object.entries(productFields).forEach(([key, value]) => {
                if(value === undefined) errors.push(`${key} is required`);
            });
            if(errors.length) return res.status(400).json({ errors });

            const product = await ProductService.create(productFields);

            return res
                .status(201)
                .json({message: 'product created successfully', data: product});
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res:Response, next: NextFunction): Promise<Response> {
        try {
            const { category } = req.query;
            let selector = {};
            if(category) selector = { category }; 
            const products = await ProductService.get(selector);

            if(!products.length) return res
                                     .status(404)
                                     .json({message: 'no product found'});

            return res
                .status(200)
                .json({message:'Success', data: products});
            
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res:Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params;

            const product = await ProductService.getById({_id: id});
            if(!product) return res
                             .status(404)
                             .json({message: 'product not found'});


            return res
                .status(200)
                .json({message:'Success', data: product});
            
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res:Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params;
            const {name, description, category, quantity, price} = req.body;

            let product = await ProductService.getById({_id: id});

            if(!product) return res
                             .status(400)
                             .json({message: 'product not found'});

            product.name = name || product.name;
            product.description = description || product.description;
            product.category = category || product.category;
            product.quantity = quantity + product.quantity;
            product.price = price || product.price;

            product = await ProductService.update(id, {...product})

            return res
                .status(200)
                .json({message:'Success', data: product});
            
        } catch (error) {
            next(error);
        }
    }

    static async deleteOne(req: Request, res:Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params;
            const product = await ProductService.update(id, { deleted: true });

            if(!product) return res
                             .status(400)
                             .json({message: 'product not found'});


            return res
                .status(200)
                .json({message:'Success', data: product});
            
        } catch (error) {
            next(error);
        }
    }

    static async deleteMany(req: Request, res:Response, next: NextFunction): Promise<Response> {
        try {
            const products = await ProductService.deleteAll({deleted: true});
            if(!products) return res
                                .status(404)
                                .json({message: 'no product found'});

            return res
                .status(200)
                .json({message: 'Success', data: products});

        } catch (error) {
            next(error);
        }
    }

}

export default ProductController;
import { IProduct,  newProductType, selectorObjectType, productByIdType, deleteAllProductType } from "Product";
import Product from '../models/Products';

class ProductService {
    async create(newProductData: newProductType): Promise<IProduct> {
        const product = new Product(newProductData);
        return product.save();
    }
    async get(selectorObject: selectorObjectType): Promise<IProduct[]> {
        const products = await Product.find({deleted:false, ...selectorObject});
        return products;
    }
    async getById(id: productByIdType): Promise<IProduct> {
        const product = await Product.findById({deleted: false, ...id});
        return product;
    }
    async update(id:string, {...data}: Partial<IProduct>): Promise<IProduct> {
        const product = await Product.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...data
                },
            },
            {new: true}
        );
        return product;
    }
    async deleteOne(id: productByIdType): Promise<IProduct> {
        const product = await Product.findByIdAndDelete(id);
        return product;
    }
    async deleteAll(deleteAllObj: deleteAllProductType) {
        const products = await Product.deleteMany(deleteAllObj);
        return products;
    }
}

export default new ProductService();
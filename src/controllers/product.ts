import { Product } from './../models/products.model';
import { ProductService } from './../services/product';
export class ProductController {

    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }


    public async getProduct(id: number) {
        return await this.productService.getProduct(id);
    }
}
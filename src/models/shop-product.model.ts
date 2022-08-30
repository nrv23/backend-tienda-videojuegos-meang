import { Platform } from './platform.model';
import { Product } from './products.model';
import { ObjectId, WithId } from 'mongodb';



export class ShopProduct {


    public _id?: ObjectId;
    public id: number;
    public product_id: number;
    public platform_id: number;
    public active: boolean;
    public price: number;
    public stock: number;
    public product?: Product;
    public platform?: Platform;

    constructor(id: number, product_id: number, platform_id: number, active: boolean, price: number, stock: number, _id?: ObjectId) {
        this.id = id;
        this.product_id = product_id;
        this.platform_id = platform_id;
        this.active = active;
        this.price = price;
        this.stock = stock;
        this._id = _id;
    }
  
}
import { ObjectId } from 'mongodb';
export class Product {
    public _id?: ObjectId;
    public id?: string;
    public name: string;
    public slug: string;
    public released: string;
    public img: string;

    constructor(_id?: ObjectId,id?: string, name: string, slug: string, released: string, img: string) {
        this._id = _id;
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.released = released;
        this.img = img;
    }
}
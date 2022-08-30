import { ObjectId } from 'mongodb';
export class Platform {

    public _id?: ObjectId;
    public id: string;
    public name: string;
    public slug: string;
    public active?: boolean;

    constructor(_id?:ObjectId, id: string, name: string, slug: string, active?: boolean) {
        this._id=_id;
        this.id=id;
        this.name=name;
        this.slug=slug;
        this.active=active;
    }
}
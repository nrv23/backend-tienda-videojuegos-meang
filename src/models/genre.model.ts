import { ObjectId } from "mongodb";

export class Genre {

   public _id?: ObjectId;
   public id?: string;
   public name!: string;
   public slug!: string;
   public active?: boolean;

   constructor(name: string, slug: string,id: string,active?: boolean) {
       this.id= id;
       this.name= name;
       this.slug= slug;
       this.active= active;
   }
}
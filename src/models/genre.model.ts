import { ObjectId } from "mongodb";

export class Genre {

   public _id?: ObjectId;
   public id?: string;
   public name!: string;
   public slug!: string;

   constructor(name: string, slug: string,id: string) {
       this.id= id;
       this.name= name;
       this.slug= slug;
   }
}
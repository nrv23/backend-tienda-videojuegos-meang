import { ObjectId } from "mongodb";
import { Clip } from "./clip.model";
import { Rating } from "./rating.model";
export class Product {
  public _id?: ObjectId;
  public id?: string;
  public name: string;
  public slug: string;
  public released: string;
  public img: string;
  public clip: Clip;
  public rating: Rating;
  public shortScreenshots: string[];

  constructor(
    _id?: ObjectId,
    id?: string,
    name: string,
    slug: string,
    released: string,
    img: string,
    clip: Clip,
    rating: Rating,
    shortScreenshots: string[]
  ) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.released = released;
    this.img = img;
    this.clip = clip;
    this.rating = rating;
    this.shortScreenshots = shortScreenshots;
  }
}

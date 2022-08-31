import { Product } from './../../models/products.model';

import { IResolvers } from '@graphql-tools/utils';


const typeProductResolvers: IResolvers = {
    Product: {
        img: (parent: Product) => !parent.img ? "": parent.img,
        released: (parent: Product) => !parent.released ? "": parent.released,
        clip: (parent: Product) => !parent.clip ? {}: parent.clip,
    }
}

export default typeProductResolvers;
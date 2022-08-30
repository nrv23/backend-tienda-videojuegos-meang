import { Platform } from './../../models/platform.model';
import { IResolvers } from '@graphql-tools/utils';


const typePlatformResolvers: IResolvers = {
    Platform: {

        active: (parent: Platform) => typeof parent.active === "undefined" 
                                        || parent.active === null 
                                        ? true 
                                        : parent.active
    }
}

export default typePlatformResolvers;
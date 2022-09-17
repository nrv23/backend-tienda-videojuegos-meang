import { ICardRequest } from './../interface/ICardRequest';
import { STRIPE_OBJECTS, STRIPE_ACTIONS } from "./../config/constant";
import StripeAPI from "../lib/stripe-api";
import { ICardResponse } from '../interface/ICreditCard';


export class CardService  {
    constructor() {}

    private stripeApi: StripeAPI = new StripeAPI();

    async createCardToken(card: ICardRequest): Promise<ICardResponse> {
        return await this.stripeApi.execute(STRIPE_OBJECTS.TOKEN,STRIPE_ACTIONS.CREATE,card);
    }
}
import { IListCardStripeResponse } from './../interface/IListCardStripeResponse';
import { ICardRequest } from "./../interface/ICardRequest";
import { STRIPE_OBJECTS, STRIPE_ACTIONS } from "./../config/constant";
import StripeAPI from "../lib/stripe-api";
import { Card, ICardResponse } from "../interface/ICreditCard";

export class CardService {
  constructor() {}

  private stripeApi: StripeAPI = new StripeAPI();

  async createCardToken(card: ICardRequest): Promise<ICardResponse> {
    return await this.stripeApi.execute(
      STRIPE_OBJECTS.TOKEN,
      STRIPE_ACTIONS.CREATE,
      card
    );
  }

  public async addTokenCard(
    customerId: string,
    tokenCard: String
  ): Promise<ICardResponse> {
    return await this.stripeApi.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.CREaTE_SOURCE,
      customerId,
      { source: tokenCard }
    );
  }
  public async retrieveSource(customerId: string, cardToken: string): Promise<Card> {
    return await this.stripeApi.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.RETRIEVE_SOURCE,
      customerId,
      cardToken
    );
  }

  public async updateCard(customerId: string, tokenCard: string, card: Card): Promise<Card> {
    
    let objUpdate: any = {};
    for (const [key, value] of Object.entries(card)) {
      if (key && value) {
        objUpdate[key] = value;
      }
    }

    return await this.stripeApi.execute(
        STRIPE_OBJECTS.CUSTOMERS,
        STRIPE_ACTIONS.UPDATE_SOURCE,
        customerId,
        tokenCard,
        objUpdate
    );
  }

  public async deleteCard(customerId:string, tokenCard: string) {
    return await this.stripeApi.execute(
        STRIPE_OBJECTS.CUSTOMERS,
        STRIPE_ACTIONS.DELETE_SOURCE,
        customerId,
        tokenCard
    ); 
  }

  public async getCards(
    customerId: string,
    limit: number,
    startingAfter: string,
    endingBefore: string
  ): Promise<IListCardStripeResponse> {
    let filter: any = {};
    filter.limit = limit;

    if (startingAfter) {
      filter.starting_after = startingAfter;
    }

    if (endingBefore) {
      filter.ending_before = endingBefore;
    }
    console.log({ filter });

    return await this.stripeApi.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.LIST_SOURCE,
      customerId,
      {object:'card', ...filter}
    );
  }
}

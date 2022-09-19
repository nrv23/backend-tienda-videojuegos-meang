import { ICharge } from './../interface/ICharge';
import { STRIPE_OBJECTS, STRIPE_ACTIONS } from "./../config/constant";
import StripeAPI from "../lib/stripe-api";

export class ChargeService {
  private stripe: StripeAPI = new StripeAPI();

  constructor() {}

  public async createCharge(
    source: string,
    amount: string | number,
    description: string,
    customer: string,
    currency?: string
  ): Promise<ICharge> {

    //convertir a cero decimal
    amount =  (Math.round((+amount +  Number.EPSILON)*100) /100)*100;// redondear al volar mas cerano entero con Number.EPSILON
    return await this.stripe.execute(
        STRIPE_OBJECTS.CHARGES,
        STRIPE_ACTIONS.CREATE,
    {
        source,
        amount,
        description,
        customer,
        currency: !currency? "USD":  currency
    });
  }
}

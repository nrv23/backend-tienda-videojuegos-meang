import { StripeCustomer } from "./../interface/StripeCustomer";
import { STRIPE_OBJECTS, STRIPE_ACTIONS } from "./../config/constant";
import { ListCustomerStripeResponse } from "../interface/IListCustomersStripeResponse";
import StripeAPI from "../lib/stripe-api";

export class StripeCustomerService {
  constructor() {}

  private stripeApi: StripeAPI = new StripeAPI();

  public async createCustomer(email: string, name: string) {
    return await this.stripeApi.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.CREATE,
      {
        email,
        name,
        description: name.concat(" ", `(${email})`),
      }
    );
  }

  public async getCustomers(
    limit: number,
    startingAfter: string,
    endingBefore: string
  ): Promise<ListCustomerStripeResponse> {
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
      STRIPE_ACTIONS.LIST,
      filter
    );
  }

  public async getCustomerByEmail(
    email: string
  ): Promise<ListCustomerStripeResponse> {
    //const query =  `email:\'${email.trim()}\'`;
    //console.log({query});
    return await this.stripeApi.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.LIST,
      { email }
    );
  }

  public async getRetrieveCustomerById(id: string): Promise<StripeCustomer> {
    return await this.stripeApi.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.RETRIEVE,
      id
    );
  }

  public async updateCustomer(id: string, obj: any) {
    let objUpdate: any = {};

    for (const [key, value] of Object.entries(obj.customer)) {
      if (key && value) {
        objUpdate[key] = value;
      }
    }
    delete objUpdate.id;

    return await this.stripeApi.execute(
      STRIPE_OBJECTS.CUSTOMERS,
      STRIPE_ACTIONS.UPDATE,
      id,
      { ...objUpdate  }
    );
  }

  public async deleteCustomer(id: string) {
    return await this.stripeApi.execute(
        STRIPE_OBJECTS.CUSTOMERS,
        STRIPE_ACTIONS.DELETE,
        id
      );
  }
}

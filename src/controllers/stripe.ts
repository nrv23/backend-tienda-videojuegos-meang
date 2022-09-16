import { User } from './../models/user.model';
import { UserController } from './users';
import { StripeCustomer } from "./../interface/StripeCustomer";
import { StripeCustomerService } from "./../services/stripe";

export class StripeCustomerController {
  constructor() {}

  private stripeCustomerService: StripeCustomerService = new StripeCustomerService();
  private userController : UserController = new UserController();

  public async getCustomerByEmail(email: string) {
    return await this.stripeCustomerService.getCustomerByEmail(email);
  }

  public async createCustomer(email: string, name: string) {
    let obj: {
      exists: boolean;
      data?: StripeCustomer[];
    } = {
      exists: false,
      data: undefined,
    };


    const { data } = await this.getCustomerByEmail(email);

    if (data.length > 0) {
      obj.exists = true;
      obj.data = undefined;

      return obj;
    }

    // trae la informacion del usuario

    const user = await this.userController.existUser(email,"update") as unknown as User[];
    
    const response = await this.stripeCustomerService.createCustomer(
      email,
      name
    );
    if (response) {

    //actualizar el usuario 
      obj.exists = false;
      obj.data = [response] as [StripeCustomer];
      
      const updateCustomerId = await this.userController.addCustomerStripeId(obj.data[0].id,user[0].id);

      if(updateCustomerId?.modifiedCount === 0) {
        console.log("No se actualizó")
      }

      return obj;
    } else {
      obj.exists = false;
      obj.data = undefined;

      return obj;
    }
  }

  public async getCustomers(
    limit: number,
    startingAfter: string = "",
    endingBefore: string = ""
  ) {
    return await this.stripeCustomerService.getCustomers(
      limit,
      startingAfter,
      endingBefore
    );
  }
}

import { CardController } from "./card";
import { StripeCustomerController } from "./stripe";
import { ChargeService } from "./../services/charge";

export class ChargeController {
  constructor() {}

  private chargeService: ChargeService = new ChargeService();
  private customer: StripeCustomerController = new StripeCustomerController();
  private card: CardController = new CardController();

  public async createChage(
    source: string, // token de la tarjeta asociada
    amount: string,
    description: string,
    customer: string,
    currency?: string,
    token?: string // token de seguridad para podergenerar el token de la tarjeta asociada
  ) {
    //Proceso de validacion de cliente con el API de stripe
    const exist = await this.customer.retrieveCustomer(customer);

    if (!exist) return null;

    if (token) {

        console.log("entró")
      //asocinar el cliente con la tarjeta
        const newCardAsociatedResponse = await this.card.addTokenCard(
            customer,
            token
        );
        console.log({newCardAsociatedResponse})
      
        if (newCardAsociatedResponse && newCardAsociatedResponse.id) {
        //actualizar como fuente determinada de pago

        const updateCustomerResponse = await this.customer.updateCustomer(customer,{customer: {
            default_source: newCardAsociatedResponse.id
        }});
        
        console.log({updateCustomerResponse})

        if(updateCustomerResponse) { // se actualizo el cliente en stripe
            source = newCardAsociatedResponse.id;
            //actualizar borrando las demás tarjetas de ese cliente
            await this.card.removeOtherCards(customer,newCardAsociatedResponse.id)
        } else {
            return null;
        }   

      } else {
        return null;
      }

    } else if (!exist[0].default_source) {
      // EL cliente no tiene ningún metodo de pago asginado en stripe
      return null;
    }

    //Generar el pago con la api de stripe
    const response = await this.chargeService.createCharge(
      source,
      amount,
      description,
      customer,
      currency
    );

    return !response ? null : [response];
  }
}

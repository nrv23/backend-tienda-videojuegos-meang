import { StripeCustomerController } from './../../controllers/stripe';
import { IResolvers } from '@graphql-tools/utils';
import { ICharge } from '../../interface/ICharge';

const typeChargeResolvers: IResolvers = {
  Charge: {
    typeOrder: (parent: ICharge) => parent.object,
    amount: (parent:ICharge) => +parent.amount! /100,
    receipt_email: async (parent:ICharge) => {
      if(parent.receipt_email) {
        return parent.receipt_email
      }
      //buscar en stripe
      const controller = new StripeCustomerController();
      const data = await controller.retrieveCustomer(parent.customer!);
      return data && data[0] ? data[0].email : ''
    },
    receipt_url: (parent:ICharge) => parent.receipt_url? parent.receipt_url: '',
    created: (parent: ICharge) => new Date(parent.created! * 1000).toISOString() // convertir a formato iso la fecha
  }
}

export default typeChargeResolvers;
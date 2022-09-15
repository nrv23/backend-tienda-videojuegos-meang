import { StripeCustomer } from './StripeCustomer';

export interface ListCustomerStripeResponse {
  object: string;
  url: string;
  has_more: boolean;
  data: StripeCustomer[];
}
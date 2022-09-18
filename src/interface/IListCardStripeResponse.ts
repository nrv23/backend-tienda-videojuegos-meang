import { Card } from './ICreditCard';
export interface IListCardStripeResponse {
    object: string
    url: string
    has_more: boolean
    data: Card[]
  }
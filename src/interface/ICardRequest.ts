export interface ICardRequest {

    number: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
    currency?: string;
}
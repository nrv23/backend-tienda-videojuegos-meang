import { Card } from "./ICreditCard";

export interface Address {
    city?: any;
    country?: any;
    line1?: any;
    line2?: any;
    postal_code?: any;
    state?: any;
}

export interface BillingDetails {
    address: Address;
    email?: any;
    name?: any;
    phone?: any;
}

export interface FraudDetails {
}

export interface Metadata {
}

export interface Checks {
    address_line1_check?: any;
    address_postal_code_check?: any;
    cvc_check: string;
}

export interface PaymentMethodDetails {
    card: Card;
    type: string;
}

export interface Refunds {
    object: string;
    data: any[];
    has_more: boolean;
    url: string;
}

export interface ICharge {
    id?: string;
    object?: string;
    amount?: number;
    amount_captured?: number;
    amount_refunded?: number;
    application?: any;
    application_fee?: any;
    application_fee_amount?: any;
    balance_transaction?: string;
    billing_details?: BillingDetails;
    calculated_statement_descriptor?: any;
    captured?: boolean;
    created?: number;
    currency?: string;
    customer?: any;
    description?: string;
    disputed: boolean;
    failure_balance_transaction?: any;
    failure_code?: any;
    failure_message?: any;
    fraud_details?: FraudDetails;
    invoice?: any;
    livemode?: boolean;
    metadata: Metadata;
    on_behalf_of?: any;
    outcome?: any;
    paid: boolean;
    payment_intent?: any;
    payment_method?: string;
    payment_method_details?: PaymentMethodDetails;
    receipt_email?: any;
    receipt_number?: any;
    receipt_url?: string;
    refunded?: boolean;
    refunds?: Refunds;
    review?: any;
    shipping?: any;
    source_transfer?: any;
    statement_descriptor?: any;
    statement_descriptor_suffix?: any;
    status?: string;
    transfer_data?: any;
    transfer_group?: any;
    source?: string;
    typeOrder: string
}

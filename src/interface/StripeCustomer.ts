export interface StripeCustomer {
    id:                  string;
    object:              string;
    address:             null;
    balance:             number;
    created:             number;
    currency:            null;
    defaultSource:       null;
    delinquent:          boolean;
    description:         string;
    discount:            null;
    email:               string;
    invoicePrefix:       string;
    invoiceSettings:     InvoiceSettings;
    livemode:            boolean;
    metadata:            Metadata;
    name:                string;
    nextInvoiceSequence: number;
    phone:               null;
    preferredLocales:    any[];
    shipping:            null;
    taxExempt:           string;
    testClock:           null;
}

export interface InvoiceSettings {
    customFields:         null;
    defaultPaymentMethod: null;
    footer:               null;
    renderingOptions:     null;
}

export interface Metadata {
}
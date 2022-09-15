export interface StripeCustomer {
    id:                  string;
    object:              string;
    address?:             string;
    balance:             number;
    created:             number;
    currency?:            string;
    defaultSource?:       string;
    delinquent:          boolean;
    description:         string;
    discount?:            number;
    email:               string;
    invoicePrefix:       string;
    invoiceSettings:     InvoiceSettings;
    livemode:            boolean;
    metadata:            Metadata;
    name:                string;
    nextInvoiceSequence: number;
    phone?:               string;
    preferredLocales:    any[];
    shipping?:            null;
    taxExempt:           string;
    testClock?:           null;
}

export interface InvoiceSettings {
    customFields:         null;
    defaultPaymentMethod: null;
    footer:               null;
    renderingOptions:     null;
}

export interface Metadata {
}
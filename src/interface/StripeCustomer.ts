export interface StripeCustomer {
    id:                  string;
    object:              string;
    address?:             string;
    balance:             number;
    created:             number;
    currency?:            string;
    default_source?:       string;
    delinquent:          boolean;
    description:         string;
    discount?:            number;
    email:               string;
    invoice_Prefix:       string;
    invoice_settings:     InvoiceSettings;
    livemode:            boolean;
    metadata:            Metadata;
    name:                string;
    next_invoice_sequence: number;
    phone?:               string;
    preferred_locales:    any[];
    shipping?:            null;
    tax_exempt:           string;
    test_clock?:           null;
}

export interface InvoiceSettings {
    customFields:         null;
    defaultPaymentMethod: null;
    footer:               null;
    renderingOptions:     null;
}

export interface Metadata {
}
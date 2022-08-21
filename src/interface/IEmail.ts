export interface IEmail {
    from?: string; //opcional
    to: string; 
    subject: string;
    html: string; 
}
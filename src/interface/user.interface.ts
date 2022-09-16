import { WithId } from 'mongodb';
export interface User {
  user: {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
    birthDate: string;
    active?: boolean;
    customerId?: boolean;
  };
}

export interface userRow  extends WithId<Document> {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    password?: string;
    role?: string;
    birthDate: string;
    registerDate: string;
    active?: boolean;
    customerId?: boolean;
}

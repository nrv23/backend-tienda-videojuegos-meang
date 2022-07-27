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
}

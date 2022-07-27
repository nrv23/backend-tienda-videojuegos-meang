export class User {

    protected id: number;
    protected name: string;
    protected lastName: string;
    protected email: string;
    protected password:string;
    protected role?:string;
    protected birthDate? :string;
    protected registerDate? :string;

    constructor(id: number , name: string, lastName: string, email: string, password: string, role?:string, birthDate?: string, registerDate?: string ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
        this.email = email;
        this.birthDate = birthDate;
        this.registerDate = registerDate;
    }
}
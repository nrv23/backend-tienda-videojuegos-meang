export class User {

    public id: number;
    public name: string;
    public lastName: string;
    public email: string;
    public password:string;
    public role?:string;
    public birthDate? :string;
    public registerDate? :string;
    public active? :boolean;

    constructor(id: number , name: string, lastName: string, email: string, password: string, role?:string, birthDate?: string, registerDate?: string, active?: boolean ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
        this.email = email;
        this.birthDate = birthDate;
        this.registerDate = registerDate;
        this.active = active;
    }
}
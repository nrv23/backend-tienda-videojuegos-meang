import { Bcrypt } from './../helper/bcrypt';
import { userRow } from './../interface/user.interface';
import { User } from '../models/user.model';
import { UserService } from './../services/users';
import { Jwt } from '../helper/jwt';

export class UserController {

    private user: UserService;
    private jwt : Jwt;
    private bcrypt: Bcrypt;

    constructor() {

        this.user = new UserService();
        this.jwt = new Jwt();
        this.bcrypt = new Bcrypt();
    }

    public async register(name: string, lastName: string, email: string, password: string, role?: string, birthDate?: string) {

        const exist = await this.user.login(email) as userRow;

        if(exist) {

            return "existe";
        }

        const lastIdResponse = await this.user.getLastId(); 
        let id : number = 0;

        if(lastIdResponse?.length === 0) {
            id = 1;
        } else {
            id = Number(lastIdResponse?.length) + 1;
        }
        password = await this.bcrypt.encryptPass(password) as string;

        const user = new User(id,name, lastName, email, password,role, birthDate,new Date().toISOString() );
        const registerResponse = await this.user.register(user);

        if(!registerResponse?.insertedId) {

            return false
        };

        return true;
    }


    public async getUsers() {

        return this.user.getUsers();
    }

    public async login(email:string, password: string) {

        let loginResponse = await this.user.login(email) as userRow;

        if(!loginResponse) {
            return 0; // no encontró a ningun usuario
        } else {

            if(!(await this.bcrypt.verifyPassword(password,loginResponse.password as string))) {
                return 1;
            } else {
                
                // genera el token
                delete loginResponse?.password 
                return this.jwt.sign(loginResponse);
            }
        }
    
    }

    public async getMe(token: string) {

        const verified = this.jwt.verify(token);
        if(!verified) {

            return "El token es inválido o la sesión ha expirado"
        } else {
            return verified;
        }
    }
}
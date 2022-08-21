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

    private async existUser(value: string | number, tipo: string) {


        if(!value ) {
            return 0;
        }

        const response = await this.user.existUser(value);
        if(tipo === "update" || tipo === "delete") {

            if(Number(response?.length) === 0) {

                return 1;
            } 

            return response;
        } else {
            if(Number(response?.length) > 0){

                return 1;
            } 

            return response;
        }
    }

    public async register(name: string, lastName: string, email: string, password: string, role?: string, birthDate?: string, active?:boolean) {

    
        const exist = await this.existUser(email,"add");

        if(exist === 1 || exist === 0) {

            return exist;
        }

        const lastIdResponse = await this.user.getLastId(); 

        let id : number = 0;

        if(lastIdResponse?.length === 0) {
            id = 1;
        } else {
            id = Number(lastIdResponse[0].id) + 1;
        }
        password = await this.bcrypt.encryptPass(password) as string;

        const user = new User(id,name, lastName, email, password,role, birthDate,new Date().toISOString(),active );
        const registerResponse = await this.user.register(user);

        if(!registerResponse?.insertedId) {

            return 2;
        };

        return "Se ha agregado el usuario con éxito";
    }


    public async getUsers(page: number = 1,items: number = 20) {

        const { users,resultPagination } = await this.user.getUsers(page, items);

        return { 
            users: users as unknown as User[],
            resultPagination 
        }
    }

    public async login(email:string, password: string) {

        let loginResponse = await this.user.login(email) as userRow;

        if(!loginResponse) {
            return 0; // no encontró a ningun usuario
        } else {

            if(loginResponse.active === false) {

                return 2;
            }

            if(!(await this.bcrypt.verifyPassword(password,loginResponse.password as string))) {
                return 1;
            } else {
                
                // genera el token
                delete loginResponse?.password 
                return this.jwt.sign(loginResponse);
            }
        }
    
    }

    public async updateUser(user: User,token: string) {

        const verified = this.jwt.verify(token);

        if(!verified) {
            throw new Error("TOKEN_VENCIDO"); 
        } 

        const exist = await this.existUser(user.id,"update");

        if(exist === 1 || exist === 0) {

            return exist;
        }

        user.password = await this.bcrypt.encryptPass(user.password) as string;

        const userUpdate = new User(user.id,user.name, user.lastName, user.email, user.password,user.role, user.birthDate);
        const updateUserResponse = await this.user.updateUser(userUpdate);

        if(updateUserResponse?.modifiedCount === 0) {

            return 2;
        } else {

            return "Se ha actualizado el usuario"
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

    public async deleteUser(id:number,token: string) {

        const verified = this.jwt.verify(token);

        if(!verified) {
            throw new Error("TOKEN_VENCIDO"); 
        } 

        const exist = await this.existUser(id,"delete");

        if(exist === 1 || exist === 0) {

            return exist;
        }


        const userDeletedResponse = await this.user.deleteUser(id);

        if(userDeletedResponse?.deletedCount === 0) {

            return 2;
        } else {

            return "Usuario eliminado con éxito";
        }

    }

    public async blockUser(id: number,active:boolean,token: string) {
        const verified = this.jwt.verify(token);

        if(!verified) {
            throw new Error("TOKEN_VENCIDO"); 
        } 

        const exist = await this.existUser(id,"delete");

        if(exist === 1 || exist === 0) {

            return exist;
        }

        const blockUserResponse = await this.user.blockUser(id,active);

        if(blockUserResponse?.modifiedCount === 0) {

            return 2;

        } else {
            return "Usuario bloqueado con éxito";
        }
    }

    public async getSesionToActiveUser(id: number) {
        let exist = await this.existUser(id,"update");

        if(exist === 1 || exist === 0) {

            return exist;
        }

        let user = (exist as unknown as  userRow[])[0]
        user.password = "";
     
        // genera el token
        return this.jwt.sign(user);
    
    }

    public async activeUser(id: number, token: string, password: string,birthDate: string) {

        const verified = this.jwt.verify(token) as any;

        if(!verified) {
            throw new Error("TOKEN_VENCIDO"); 
        } 
        console.log(verified.user);
        const checkToken = Object.values(verified.user) as unknown as userRow;

        if(Number(checkToken.id) !== id){
            return 3;
        }

        let exist = await this.existUser(id,"update");

        if(exist === 1 || exist === 0) {

            return exist;
        }

        const newPass = await this.bcrypt.encryptPass(password) as string;

        const activatedUser = await this.user.activeUser(id,newPass,birthDate);

        if(activatedUser?.modifiedCount === 0) {

            return 2;
        }

        return "Se ha activado el usuario";
    }
}
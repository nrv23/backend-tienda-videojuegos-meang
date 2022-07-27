import { userRow } from './../interface/user.interface';
import jwt from 'jsonwebtoken';
import { EXPRES_IN, SECRET_KEY } from '../config/constant';

export class Jwt {

    public secret_key : string = SECRET_KEY as string;

    sign(data: userRow, expiresIn: number = EXPRES_IN.H1 ) {

        return jwt.sign({user: data},this.secret_key, {
            expiresIn //: 24 * 60 * 60 // 24 horas
        })
    }

    verify(token: string) {

        try {
            
            return jwt.verify(token, this.secret_key) as string;

        } catch (error) {
            
            return false;
        }
    }
}
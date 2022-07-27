import { saltRounds } from './../config/constant';
import bcrypt from 'bcrypt';

export class Bcrypt {

    constructor() {

    }

    encryptPass(password: string) {

        return new Promise((resolve, reject) => {

            bcrypt.genSalt(saltRounds, function (err, salt) {
                if(err) {
                    return reject(err);
                }
                bcrypt.hash(password, salt, function (err, hash) {
                    // Store hash in your password DB.
                    if(err) {
                        return reject(err);
                    }

                    return resolve(hash);
                });
            });
        })
    }

    verifyPassword( password:string,hash: string) : Promise<boolean | unknown | undefined> {

        return new Promise((resolve,reject) => {
            bcrypt.compare(password, hash, function(err, result) {
                if(err){
                    return reject(err);
                }

                return resolve(result);
            });
        })
    }
}
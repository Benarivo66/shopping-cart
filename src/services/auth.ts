import crypto from 'crypto';

class AuthService {
    async hash(password:string) {
        return new Promise ((resolve, reject) => {
            const salt = crypto.randomBytes(8).toString("hex");

            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if(err) reject(err);
                resolve(salt + ":"  + derivedKey.toString('hex'))
            })
        })
    }
    async verify(password:string, hash:string){
        return  new Promise ((resolve, reject) => {
            const [salt, key] = hash.split(":");
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if(err) reject(err);
                resolve(key == derivedKey.toString('hex'))
            });
        })
    }
}

export default new AuthService()
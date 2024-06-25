import { prisma } from "../lib/db";
import JWT from 'jsonwebtoken'
const { createHmac, randomBytes } = require('node:crypto');

const JWT_SECRET='@rslandev'
export interface userPayload {

    firstName: string,
    lastName: string,
    email: string,
    password: string

}
export interface getUserTokenPayload {

    email: string,
    password: string

}

class UserServices {

    private static generateHashed(salt: string, password: string) {
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
        return hashedPassword
    }
    public static createUser(payload: userPayload) {


        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString('hex');
        const hashedPassword = UserServices.generateHashed(salt, password)
        return prisma.user.create(
            {
                data: {
                    firstName,
                    lastName,
                    email,
                    salt,
                    password: hashedPassword
                }
            }
        )


    }

    private static  getUserByEmail(email: string) {
       return prisma.user.findUnique({ where: { email } })

    }
    public static async getUserToken(payload: getUserTokenPayload) {
        const {email,password}=payload;
        const user=await UserServices.getUserByEmail(email);
        if(!user) throw new Error ('user not found');
        const userSalt=user.salt;
        const userHashedPassword=UserServices.generateHashed(userSalt,password);
        if(userHashedPassword !==user.password) throw new Error ('invalid credentials')

const token=JWT.sign({email:user.email,password:user.password},JWT_SECRET)
return token

    }

}

export default UserServices
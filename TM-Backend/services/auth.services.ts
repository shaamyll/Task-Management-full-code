import { where } from "sequelize";
import { LoginDTO, SignUpDto } from "../dtos/auth.dto";
import { UserData } from "../interfaces/auth.Interface";
import { User } from "../models/User"
import jwt from "jsonwebtoken";

class AuthServices {
    public async signUp(data: SignUpDto): Promise<UserData> {
        const user = await User.findOne({ where: { email: data.email } })
        if (user) {
            throw { status: 409, message: "User already exists" }
        }
        const newUser = await User.create({
            email: data.email,
            username: data.username,
            password: data.password,
            role: "user"
        });
        console.log(newUser)
        return newUser;
    }


    public async login(data: LoginDTO): Promise<any> {
        const user = await User.findOne({ where: { email: data.email } })
        if (!user) {
            throw { status: 404, message: "User not exists" }
        }

        if (user.password !== data.password) {
            throw { status: 401, message: "Invalid Password" }
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }

        const token = await jwt.sign(payload, process.env.JWT_KEY as string, { expiresIn: "1h" });
        return { user: payload, token: `Bearer ${token}` };
    }

    //fetch all users
    public async fetchAllUsers(): Promise<UserData[]> {
        return await User.findAll()
    }

    //Delete user
    public async deleteUser(id:number): Promise<void> {
        const user = await User.findOne({where : {id}})
        if(!user){
            throw{ status:404 , message:"User not found"}
        }

        const deleteUser = await User.destroy({where:{id}})
    }



}

export default AuthServices;
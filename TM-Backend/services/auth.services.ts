import { Op } from "sequelize";
import { LoginDTO, SignUpDto, UserFilters } from "../dtos/auth.dto";
import { UserData } from "../types/auth.Interface";
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


 public async fetchAllUsers(filters: UserFilters): Promise<User[]> {
  const where: any = {};

  if (filters.searchName) {
    where.username = { [Op.iLike]: `%${filters.searchName}%` };
  }

  if (filters.searchEmail) {
    where.email = { [Op.iLike]: `%${filters.searchEmail}%` };
  }

  if (filters.role) {
    where.role = filters.role;
  }

  console.log("📦 Final WHERE clause:", where);

  return await User.findAll({
    where,
    order: [['createdAt', 'DESC']],
  });
}


    //Delete user
    public async deleteUser(id:number): Promise<void> {
        const user = await User.findOne({where : {id}})
        if(!user){
            throw{ status:404 , message:"User not found"}
        }

        const deleteUser = await User.destroy({where:{id}})
    }


      public async createUser(data: any): Promise<UserData> {
        const user = await User.findOne({ where: { email: data.email } })
        if (user) {
            throw { status: 409, message: "User already exists" }
        }
        const newUser = await User.create({
            email: data.email,
            username: data.username,
            password: data.password,
            role: data.role || "user"
        });
        console.log(newUser)
        return newUser;
    }


        public async updateUser(id:string,data: SignUpDto): Promise<any> {
        const updatedUser = await User.update(data,{
           where:{
            id
           },
        returning:true
        });

        return updatedUser;
    }




}

export default AuthServices;
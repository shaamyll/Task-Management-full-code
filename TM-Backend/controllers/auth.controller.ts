import { Request, Response, NextFunction } from 'express';
import { LoginDTO, SignUpDto, UserFilters } from '../dtos/auth.dto';
import AuthServices from '../services/auth.services';

class AuthController {
    public authService = new AuthServices();

    public signUp = async (req: Request, res: Response , next:NextFunction) => {

        try {
            const userData:SignUpDto = req.body;
            const data = await this.authService.signUp(userData);
            res.status(201).json({message:"User Created Successfully",data});

        } catch(err:any){
            res.status(err.status??500).json({message:err.message??"Something went wrong"})
        }
    }


      public login = async (req: Request, res: Response , next:NextFunction) => {

        try {
            const userData:LoginDTO = req.body;
            const data = await this.authService.login(userData);
            res.status(201).json({message:"Login Successfull",data});

        } catch(err:any){
            res.status(err.status??500).json({message:err.message??"Something went wrong"})
        }
    }

    //  public fetchAllUsers = async (req: Request, res: Response , next:NextFunction) => {

    //     try {
    //         const data = await this.authService.fetchAllUsers();
    //         res.status(201).json({message:"All users data fetched Successfully",data});

    //     } catch(err:any){
    //         res.status(err.status??500).json({message:err.message??"Something went wrong"})
    //     }
    // }

public fetchAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { searchName = '', searchEmail = '', role = '' } = req.query as {
      searchName?: string;
      searchEmail?: string;
      role?: string;
    };

    const data = await this.authService.fetchAllUsers({ searchName, searchEmail, role });

    res.status(200).json({ message: "All users data fetched successfully", data });
  } catch (err: any) {
    res.status(err.status ?? 500).json({ message: err.message ?? "Something went wrong" });
  }
}



    //Deleet user
      public deleteUser = async (req: Request, res: Response , next:NextFunction) => {

        try {
            const data = await this.authService.deleteUser(
                req.params.id as unknown as number,

            );
            res.status(201).json({message:"User Deleted Successfully",data});

        } catch(err:any){
            res.status(err.status??500).json({message:err.message??"Something went wrong"})
        }
    }


    
    public createUser = async (req: Request, res: Response , next:NextFunction) => {

        try {
            const userData:SignUpDto = req.body;
            const data = await this.authService.createUser(userData);
            res.status(201).json({message:"User Created Successfully",data});

        } catch(err:any){
            res.status(err.status??500).json({message:err.message??"Something went wrong"})
        }
    }


    
    //Deleet user
      public updateUser = async (req: Request, res: Response , next:NextFunction) => {

        try {
            const updatedData = req.body as SignUpDto
            const data = await this.authService.updateUser(req.params.id,updatedData)
            res.status(201).json({message:"User Updated Successfully",data});

        } catch(err:any){
            res.status(err.status??500).json({message:err.message??"Something went wrong"})
        }
    }


}

export default AuthController;
import { Router, Request, Response } from 'express';
import Route from '../interfaces/route.interface';
import AuthController from '../controllers/auth.controller'
import validationMiddleware from '../middlewares/validation.middleware';
import { SignUpDto, LoginDTO } from '../dtos/auth.dto';
import authMiddleware from '../middlewares/authentication.middleware';

class AuthRoutes implements Route {
  public router = Router();

  public path = '/auth';

  public authController = new AuthController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(SignUpDto, 'body'), this.authController.signUp);

    this.router.post(`${this.path}/login`, validationMiddleware(LoginDTO, 'body'), this.authController.login);

    //Create user
    this.router.post(`/createUser`, validationMiddleware(SignUpDto, 'body'), authMiddleware,this.authController.createUser);

    //fetch all Users
    this.router.get(`/allUsers`, authMiddleware, this.authController.fetchAllUsers);

    this.router.delete(`/deleteUser/:id`, authMiddleware, this.authController.deleteUser);

    //Edti user
  this.router.put(`/updateUser/:id`, validationMiddleware(SignUpDto, 'body'),authMiddleware, this.authController.updateUser);


  }


}

export default AuthRoutes;

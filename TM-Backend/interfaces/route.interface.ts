import { Router } from "express";
import { User } from "../models/User";

interface Route {
    router: Router;
    path: string;
}

export default Route;




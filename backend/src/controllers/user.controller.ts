
import UserService from "../services/user.service";

import { Request, Response } from "express";

class UserController {

     

    public static async getAllUsers(_req: Request, res: Response) {

        const user = await UserService.getAllUsers()

         if (!user) {
            return res.status(500)
         }
         return res.status(200).json(user);
      }



}



export default UserController;
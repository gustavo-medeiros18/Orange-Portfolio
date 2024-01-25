import { Request, Response } from "express";
import userService from "../services/user.service";

const findAll = async (_req: Request, res: Response) => {
    const users = await userService.findAll();
    console.log(users)
    return res.status(200).json({message: users});
}

const login = async (req: Request, res: Response) => {
    const {email} = await req.body;

    return res.status(200).json({ email })
    
}

export default {
    findAll,
    login,
}
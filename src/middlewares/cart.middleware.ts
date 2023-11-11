import { Request, Response, NextFunction } from "express";
import { CurrentUser } from "./auth.middleware";

export async function verifyAbilityToDeleteCart (req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as CurrentUser;
    
    if (user.role !== 'ADMIN') {
      return res.status(403).send("Invalid user role");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
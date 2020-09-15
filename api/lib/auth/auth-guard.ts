import jwt from "jsonwebtoken";
import { injectable, inject } from "tsyringe";
import { Response, Request, NextFunction } from "express";

import { IConfig } from "../../components/config";
import { UserEntity } from "../../components/users/user.entity";

export interface IAuthGuard {
  sign: (payload: object) => string;
  isAuthenticated: (req: any, res: any, next: any) => void;
  decode: (token: string) => IClaims;
  setClaims: (res: Response, claims: IClaims) => void;
  handleUnauthorized: (res: Response, reason?: string, status?: number) => void;
  handleAuthorized: (res: Response, user: UserEntity) => void;
}

interface IClaims {
  id: number;
  role: string;
  name: string;
}

@injectable()
class AuthGuard implements IAuthGuard {
  JWTTokenOptions: object;
  cookieClaimsOptions: object;
  JWTSecret: string;

  constructor(@inject("IConfig") private config: IConfig) {
    this.cookieClaimsOptions = { maxAge: this.config.SESSION_LIFETIME };
    this.JWTTokenOptions = {
      expiresIn: "24h",
    };
    this.JWTSecret = process.env.JWT_SECRET;
  }

  sign(payload: IClaims): string {
    return jwt.sign(payload, this.JWTSecret, this.JWTTokenOptions);
  }

  decode(token: string): IClaims {
    // TODO: research about types, looks like hack
    let decoded: any = jwt.verify(token, this.JWTSecret);

    if (typeof decoded === "string") {
      decoded = JSON.parse(decoded);
    }
    
    const {
      id,
      role,
      name,
    }: { id: number; role: string; name: string } = decoded;
    const claims: IClaims = { id, role, name };

    return claims;
  }

  isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const token: string = req.cookies[this.config.TOKEN_NAME];

    if (token) {
      try {
        res.locals.user = this.decode(token);
        next();
      } catch (error) {
        this.handleUnauthorized(res, "token is invalid");
      }
    } else {
      this.handleUnauthorized(res, "no token found");
    }
  };

  setClaims(res: Response, claims: IClaims): void {
    const token: string = this.sign(claims);
    res.cookie(this.config.TOKEN_NAME, token, this.cookieClaimsOptions);
  }

  handleAuthorized(res: Response, user: UserEntity): void {
    const { id, role, name } = user;
    this.setClaims(res, { id, role, name });
    res.status(200).json({ authorized: true, ...user });
  }

  handleUnauthorized(
    res: Response,
    reason: string = "because",
    status: number = 401
  ): void {
    res.clearCookie(this.config.TOKEN_NAME);
    res.status(status).json({ authorized: false, reason });
  }
}

export default AuthGuard;

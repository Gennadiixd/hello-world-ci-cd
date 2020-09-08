import jwt from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import { IConfig } from "../../components/config";

export interface IAuthGuard {
  sign: (body: any) => any;
  isAuthenticated: (req: any, res: any, next: any) => void;
  decode: (token: string) => any;
  setClaims: (res: any, claims: any) => void;
  handleUnauthorized: (res: any, reason: any, status?: any) => void;
  handleAuthorized: (res: any, user: any) => void;
}

@injectable()
class AuthGuard implements IAuthGuard {
  JWTTokenOptions: any;
  cookieClaimsOptions: any;
  JWTSecret: string;

  constructor(@inject("IConfig") private config: IConfig) {
    this.cookieClaimsOptions = { maxAge: this.config.SESSION_LIFETIME };
    this.JWTTokenOptions = {
      expiresIn: "24h",
    };
    this.JWTSecret = process.env.JWT_SECRET;
  }

  sign(body) {
    return jwt.sign({ ...body }, this.JWTSecret, this.JWTTokenOptions);
  }

  decode(claims) {
    return jwt.verify(claims, this.JWTSecret);
  }

  isAuthenticated = (req, res, next) => {
    const token = req.cookies[this.config.TOKEN_NAME];

    if (token) {
      try {
        req.user = this.decode(token);
        next();
      } catch (error) {
        this.handleUnauthorized(res, "token is invalid");
      }
    } else {
      this.handleUnauthorized(res, "no token found");
    }
  };

  setClaims(res, claims) {
    const token = this.sign(claims);
    res.cookie(this.config.TOKEN_NAME, token, this.cookieClaimsOptions);
  }

  handleAuthorized(res, user) {
    const { id, role, name } = user;
    this.setClaims(res, { id, role, name });
    res.status(200).json({ authorized: true, ...user });
  }

  handleUnauthorized(res, reason = "because", status = 401) {
    res.clearCookie(this.config.TOKEN_NAME);
    res.status(status).json({ authorized: false, reason });
  }
}

export default AuthGuard;

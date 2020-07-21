import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

export interface IAuthGuard {
  sign: (body: any) => any;
  isAuthenticated: (req: any, res: any, next: any) => void;
  decode: (token: string) => any;
  destroyCookies: (res: any) => void;
  setClaims: (res: any, token: any) => void;
  handleUnauthorized: (res: any) => void;
  handleAuthorized: (res: any, user: any) => void;
}

const COOKIE_NAME = "claims";
const ONE_DAY = 24 * 60 * 60 * 1000;

@injectable()
class AuthGuard implements IAuthGuard {
  JWTTokenOptions: any;
  cookieClaimsOptions: any;
  JWTSecret: string;

  constructor() {
    this.cookieClaimsOptions = { maxAge: ONE_DAY };
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
    const token = req.cookies[COOKIE_NAME];

    if (token) {
      try {
        req.user = this.decode(token);
        next();
      } catch (error) {
        this.handleUnauthorized(res);
      }
    } else {
      this.handleUnauthorized(res);
    }
  };

  setClaims(res, claims) {
    const token = this.sign(claims);
    res.cookie(COOKIE_NAME, token, this.cookieClaimsOptions);
  }

  destroyCookies(res) {
    res.clearCookie(COOKIE_NAME);
  }

  handleAuthorized(res, user) {
    const { id, role } = user;
    this.setClaims(res, { id, role });
    res.status(200).json({ authorized: true, user });
  }

  handleUnauthorized(res) {
    this.destroyCookies(res);
    res.status(401).json({ authorized: false });
  }
}

export default AuthGuard;

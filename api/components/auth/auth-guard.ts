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

@injectable()
class AuthGuard implements IAuthGuard {
  JWTTokenOptions: any;
  cookieClaimsOptions: any;
  JWTSecret: string;

  constructor() {
    this.cookieClaimsOptions = { maxAge: 24 * 60 * 60 * 1000 };
    this.JWTTokenOptions = {
      expiresIn: "24h",
    };
    this.JWTSecret = process.env.JWT_SECRET;
  }

  sign(body) {
    return jwt.sign({ ...body }, this.JWTSecret, this.JWTTokenOptions);
  }

  decode(claims) {
    return jwt.verify(claims, this.JWTSecret, this.JWTTokenOptions);
  }

  isAuthenticated = (req, res, next) => {
    const claims = req.cookies[COOKIE_NAME];

    if (claims) {
      try {
        const decodedToken = this.decode(claims);
        req.user = decodedToken;
        next();
      } catch (error) {
        this.handleUnauthorized(res);
      }
    } else {
      this.handleUnauthorized(res);
    }
  };

  setClaims(res, claims) {
    const encryptedClaims = this.sign(claims);
    res.cookie(COOKIE_NAME, encryptedClaims, this.cookieClaimsOptions);
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

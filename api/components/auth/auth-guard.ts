import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

export interface IAuthGuard {
  sign: (body: any) => any;
  isAuthenticated: (req: any, res: any, next: any) => void;
  decode: (token: string) => any;
  destroyCookies: (res: any) => void;
  setToken: (res: any, token: any) => void;
  handleUnauthorized: (res: any) => void;
}

@injectable()
class AuthGuard implements IAuthGuard {
  privateKey: string;
  JWTTokenOptions: any;
  keyPath: string;
  cookieTokenOptions: any;
  JWTSecret: string;

  constructor() {
    this.cookieTokenOptions = { maxAge: 99999999 };
    this.JWTTokenOptions = {
      algorithm: "HS256",
      expiresIn: this.cookieTokenOptions.maxAge,
    };
    this.JWTSecret = process.env.JWT_SECRET;
    this.privateKey = this.JWTSecret;
  }

  sign(body) {
    return jwt.sign({ ...body }, this.privateKey, this.JWTTokenOptions);
  }

  decode(token) {
    return jwt.verify(token, this.privateKey, this.JWTTokenOptions);
  }

  isAuthenticated = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];

    if (token) {
      try {
        const decodedToken = this.decode(token);
        req.user = decodedToken;
        next();
      } catch (error) {
        this.handleUnauthorized(res);
      }
    } else {
      this.handleUnauthorized(res);
    }
  };

  setToken(res, token) {
    const encryptedToken = this.sign(token);
    res.cookie("token", encryptedToken, this.cookieTokenOptions);
  }

  destroyCookies(res) {
    res.clearCookie("token");
  }

  handleUnauthorized(res) {
    this.destroyCookies(res);
    res.status(401).json({ authorized: false });
  }
}

export default AuthGuard;

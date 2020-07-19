import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

export interface IAuthGuard {
  sign: (body: any) => any;
  isAuthenticated: (req: any, res: any, next: any) => void;
  decode: (token: string) => any;
  destroyCookies: (res: any) => void;
  setSID: (res: any, SID: any) => void;
  setToken: (res: any, token: any) => void;
}

@injectable()
class AuthGuard implements IAuthGuard {
  privateKey: string;
  algorithm: any;
  keyPath: string;

  constructor() {
    this.algorithm = { algorithm: "HS256" };
    this.privateKey = "MySuperSecretPassPhrase";
  }

  sign(body) {
    return jwt.sign({ ...body }, this.privateKey, this.algorithm);
  }

  decode(token) {
    return jwt.verify(token, this.privateKey, this.algorithm);
  }

  isAuthenticated = (req, res, next) => {
    const { SID } = req.cookies;
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];

    console.log(SID, authorization);
    

    if (token && SID) {
      try {
        this.decode(SID);
        const decodedToken = this.decode(token);
        req.user = decodedToken;
        next();
      } catch (error) {
        this.handleUnauthorized(res);
      }
    } else if (SID) {
      try {
        this.decode(SID);
        res.status(401).json({ error: "Not Authorized" });
      } catch (error) {
        this.handleUnauthorized(res);
      }
    } else {
      this.handleUnauthorized(res);
    }
  };

  setSID(res, SID) {
    const encryptedSID = this.sign(SID);
    res.cookie("SID", encryptedSID, { maxAge: 99999999, httpOnly: true });
  }

  setToken(res, token) {
    const encryptedToken = this.sign(token);
    res.cookie("token", encryptedToken, { maxAge: 900000 });
  }

  destroyCookies(res) {
    res.clearCookie("SID");
    res.clearCookie("token");
  }

  handleUnauthorized(res) {
    this.destroyCookies(res);
    res.status(401).json({ error: "Not Authorized" });
  }
}

export default AuthGuard;

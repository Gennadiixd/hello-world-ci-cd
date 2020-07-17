import jwt from "jsonwebtoken";

export interface IAuthGuard {
  sign: (body: any) => any;
  isAuthenticated: (req: any, res: any, next: any) => void;
  decode: (token: string) => any;
  destroyCookies: (res: any) => void;
}

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
    if (typeof req.headers.authorization !== "undefined") {
      let token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, this.privateKey, this.algorithm, (err, user) => {
        if (err) {
          this.destroyCookies(res);
          res.status(500).json({ error: "Not Authorized" });
        }
        return next();
      });
    } else {
      res.status(500).json({ error: "Not Authorized" });
    }
  };

  destroyCookies(res) {
    res.clearCookie("SID");
    res.clearCookie("token");
  }
}

export default AuthGuard;

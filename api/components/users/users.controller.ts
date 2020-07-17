import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { IUsersService } from "./users-service";
import { IAuthGuard } from "../auth/auth-guard";

export interface IUsersController {
  authorizeUser: (req: Request, res: Response) => void;
}

@injectable()
class UsersController implements IUsersController {
  constructor(
    @inject("IUsersService") public usersService: IUsersService,
    @inject("IAuthGuard") public authGuard: IAuthGuard
  ) {}

  authorizeUser = async (req: Request, res: Response) => {
    const { SID } = req.cookies;

    if (SID) {
      let decodedSID;

      try {
        decodedSID = this.authGuard.decode(SID);
      } catch (error) {
        this.authGuard.destroyCookies(res);
        res.status(401).json({ authorized: false });
      }

      req.body.id = decodedSID.id;
      this.loginUser(req, res);
    } else {
      this.authGuard.destroyCookies(res);
      res.status(401).json({ authorized: false });
    }
  };

  loginUser = async (req: Request, res: Response) => {
    const { name, password, id } = req.body;
    const user = await this.usersService.loginUser({ name, password, id });

    if (user) {
      const sid = this.authGuard.sign(user);
      res.cookie("SID", sid, {
        maxAge: 99999999,
        httpOnly: true,
      });

      res.cookie("token", sid, { maxAge: 900000 });

      res.status(200).json({ authorized: true, user });
    } else {
      res.status(401).json({ authorized: false, user });
    }
  };
}

export default UsersController;

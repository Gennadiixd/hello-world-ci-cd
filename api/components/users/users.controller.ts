import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { IUsersService } from "./users-service";
import { IAuthGuard } from "../auth/auth-guard";
import { AuthenticateUserDTO } from "./dto/authenticate-user.dto";
import { LoginUserDTO } from "./dto/login-user-dto";

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
      try {
        const decodedSID = this.authGuard.decode(SID);
        const loginDTO = new AuthenticateUserDTO(decodedSID);
        const user = await this.usersService.loginUser(loginDTO);

        this.authGuard.setToken(res, user);
        
        res.status(200).json({ authorized: true, user });
      } catch (error) {
        this.authGuard.destroyCookies(res);
        res.status(401).json({ authorized: false });
      }
    } else {
      this.authGuard.destroyCookies(res);
      res.status(401).json({ authorized: false });
    }
  };

  loginUser = async (req: Request, res: Response) => {
    const loginDTO = new LoginUserDTO(req.body);
    const user = await this.usersService.loginUser(loginDTO);

    if (user) {
      this.authGuard.setSID(res, user);
      this.authGuard.setToken(res, user);

      res.status(200).json({ authorized: true, user });
    } else {
      res.status(401).json({ authorized: false, user });
    }
  };
}

export default UsersController;

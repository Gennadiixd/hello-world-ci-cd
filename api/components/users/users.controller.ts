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
    const { token } = req.cookies;

    if (token) {
      try {
        const decodedToken = this.authGuard.decode(token);
        const loginDTO = new AuthenticateUserDTO(decodedToken);
        const user = await this.usersService.loginUser(loginDTO);

        if (!user) throw new Error("unauthorized");

        res.status(200).json({ authorized: true });
      } catch (error) {
        this.authGuard.handleUnauthorized(res);
      }
    } else {
      this.authGuard.handleUnauthorized(res);
    }
  };

  loginUser = async (req: Request, res: Response) => {
    const loginDTO = new LoginUserDTO(req.body);
    let user;

    try {
      user = await this.usersService.loginUser(loginDTO);
    } catch (error) {
      this.authGuard.handleUnauthorized(res);
    }

    if (user) {
      this.authGuard.setToken(res, user);
      res.status(200).json({ authorized: true });
    } else {
      this.authGuard.handleUnauthorized(res);
    }
  };
}

export default UsersController;

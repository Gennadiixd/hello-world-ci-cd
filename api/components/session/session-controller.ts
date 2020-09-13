import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { GetUserDTO } from "../users/dto/get-user.dto";
import { IUsersService } from "../users/users-service";
import { IAuthGuard } from "../../lib/auth/auth-guard";
import { AuthUserDTO } from "../users/dto/auth-user-dto";
import { IConfig } from "../config";

export interface ISessionController {
  destroySession: (req: Request, res: Response) => void;
  getSession: (req: Request, res: Response) => void;
  createSession: (req: Request, res: Response) => void;
}

@injectable()
class SessionController implements ISessionController {
  constructor(
    @inject("IUsersService") public usersService: IUsersService,
    @inject("IAuthGuard") public authGuard: IAuthGuard,
    @inject("IConfig") public config: IConfig
  ) {}

  destroySession = (_, res: Response) => {
    this.authGuard.handleUnauthorized(res, "successfully log out!", 200);
  };

  getSession = async (req: Request, res: Response) => {
    const token = req.cookies[this.config.TOKEN_NAME];

    try {
      const claims = this.authGuard.decode(token);
      const getUserDTO = new GetUserDTO(claims);
      const user = await this.usersService.getUser(getUserDTO);

      this.authGuard.handleAuthorized(res, user);
    } catch (error) {
      this.authGuard.handleUnauthorized(res, { error: error.stack });
    }
  };

  createSession = async (req: Request, res: Response) => {
    try {
      const authUserDTO = new AuthUserDTO(req.body);
      const user = await this.usersService.authenticateUser(authUserDTO);

      this.authGuard.handleAuthorized(res, user);
    } catch (error) {
      this.authGuard.handleUnauthorized(res, { error: error.stack });
    }
  };
}

export default SessionController;

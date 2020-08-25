import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { GetUserDTO } from "../users/dto/get-user.dto";
import { IUsersService } from "../users/users-service";
import { IAuthGuard } from "../auth/auth-guard";
import { TOKEN_NAME } from "../../constants";
import { AuthUserDTO } from "../users/dto/auth-user-dto";

export interface ISessionController {
  destroySession: (req: Request, res: Response) => void;
  getSession: (req: Request, res: Response) => void;
  createSession: (req: Request, res: Response) => void;
}

@injectable()
class SessionController implements ISessionController {
  constructor(
    @inject("IUsersService") public usersService: IUsersService,
    @inject("IAuthGuard") public authGuard: IAuthGuard
  ) {}

  destroySession = (_, res: Response) => {
    this.authGuard.handleUnauthorized(res, "successfully log out!", 200);
  };

  getSession = async (req: Request, res: Response) => {
    const token = req.cookies[TOKEN_NAME];

    try {
      const claims = this.authGuard.decode(token);
      const getUserDTO = new GetUserDTO(claims);
      const user = await this.usersService.findUserByName(getUserDTO.name);

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

import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { GetUserDTO, IGetUserDTO } from "../users/dto/get-user.dto";
import { IUsersService } from "../users/users-service";
import { IAuthGuard } from "../../lib/auth/auth-guard";
import { AuthUserDTO, IAuthUserDTO } from "../users/dto/auth-user-dto";
import { IConfig } from "../config";
import ControllerProto from "../../lib/controller-proto";
import { UserEntity } from "../users/user.entity";

export interface ISessionController {
  destroySession: (req: Request, res: Response) => void;
  getSession: (_: Request, res: Response) => Promise<void>;
  createSession: (req: Request, res: Response) => Promise<void>;
}

@injectable()
class SessionController extends ControllerProto implements ISessionController {
  constructor(
    @inject("IUsersService") public usersService: IUsersService,
    @inject("IAuthGuard") public authGuard: IAuthGuard,
    @inject("IConfig") public config: IConfig
  ) {
    super();
  }

  destroySession = (_: Request, res: Response): void => {
    this.authGuard.handleUnauthorized(res, "successfully log out!", 200);
  };

  getSession = async (req: Request, res: Response): Promise<void> => {
    const token: string = req.cookies[this.config.TOKEN_NAME];

    try {
      const claims = this.authGuard.decode(token);
      const getUserDTO: IGetUserDTO = new GetUserDTO(claims);
      const user: UserEntity = await this.usersService.getUser(getUserDTO);

      this.authGuard.handleAuthorized(res, user);
    } catch (error) {
      this.authGuard.handleUnauthorized(res, error.message);
    }
  };

  createSession = async (req: Request, res: Response): Promise<void> => {
    if (this.validationHook(req, res)) return;

    try {
      const authUserDTO: IAuthUserDTO = new AuthUserDTO(req.body);
      const user: UserEntity = await this.usersService.authenticateUser(
        authUserDTO
      );

      this.authGuard.handleAuthorized(res, user);
    } catch (error) {
      this.authGuard.handleUnauthorized(res, error.message);
    }
  };
}

export default SessionController;

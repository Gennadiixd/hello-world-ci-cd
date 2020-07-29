import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { IUsersService } from "./users-service";
import { IAuthGuard } from "../auth/auth-guard";
import { LoginUserDTO } from "./dto/login-user-dto";

export interface IUsersController {
  loginUser: (req: Request, res: Response) => void;
}

@injectable()
class UsersController implements IUsersController {
  constructor(
    @inject("IUsersService") public usersService: IUsersService,
    @inject("IAuthGuard") public authGuard: IAuthGuard
  ) {}

  loginUser = async (req: Request, res: Response) => {
    const loginUserDTO = new LoginUserDTO(req.body);

    try {
      const user = await this.usersService.loginUser(loginUserDTO);
      this.authGuard.handleAuthorized(res, user);
    } catch (error) {
      this.authGuard.handleUnauthorized(res, { ...error });
    }
  };
}

export default UsersController;

import { GetUserDTO } from "./dto/get-user.dto";
import { injectable, inject } from "tsyringe";
import { Response, Request } from "express";

import { IUsersService } from "./users-service";
import { IAuthGuard } from "../auth/auth-guard";
import { LoginUserDTO } from "./dto/login-user-dto";
import { TOKEN_NAME } from "../../constants";

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
    const token = req.cookies[TOKEN_NAME];

    try {
      if (token) {
        const claims = this.authGuard.decode(token);
        const getUserDTO = new GetUserDTO(claims);
        const user = await this.usersService.findUserByName(getUserDTO);

        this.authGuard.handleAuthorized(res, user);
      } else {
        const loginUserDTO = new LoginUserDTO(req.body);
        const user = await this.usersService.loginUser(loginUserDTO);

        this.authGuard.handleAuthorized(res, user);
      }
    } catch (error) {
      this.authGuard.handleUnauthorized(res, { error: error.stack });
    }
  };
}

export default UsersController;

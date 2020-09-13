import { injectable, inject } from "tsyringe";
import { IUsersService } from "./users-service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Response, Request } from "express";
import { GetUserDTO } from "./dto/get-user.dto";
import { validationResult } from "express-validator";
import ControllerProto from "../../lib/controller-proto/index";

export interface IUsersController {
  deleteUser: (req: Request, res: Response) => void;
  updateUser: (req: Request, res: Response) => void;
  createUser: (req: Request, res: Response) => void;
}

@injectable()
class UsersController extends ControllerProto implements IUsersController {
  constructor(@inject("IUsersService") public usersService: IUsersService) {
    super();
  }

  deleteUser = async () => {};
  updateUser = async () => {};

  createUser = async (req: Request, res: Response) => {
    const createUserDTO = new CreateUserDTO(req.body);
    const user = await this.usersService.createUser(createUserDTO);
    res.json({ user });
  };

  getUser = async (req: Request, res: Response) => {
    this.validationHook(req, res);
    
    const getUserDTO = new GetUserDTO(req.body);
    const user = await this.usersService.getUser(getUserDTO);
    res.json({ user });
  };
}

export default UsersController;

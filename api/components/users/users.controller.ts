import { injectable, inject } from "tsyringe";
import { IUsersService } from "./users-service";
import { CreateUserDTO, ICreateUserDTO } from "./dto/create-user.dto";
import { Response, Request } from "express";
import { GetUserDTO, IGetUserDTO } from "./dto/get-user.dto";
import ControllerProto from "../../lib/controller-proto/index";
import { UserEntity } from "./user.entity";

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
    if (this.validationHook(req, res)) return;

    try {
      const createUserDTO: ICreateUserDTO = new CreateUserDTO(req.body);
      const user: UserEntity = await this.usersService.createUser(
        createUserDTO
      );
      res.json({ user });
    } catch (error) {
      res.json(error.message);
    }
  };

  getUser = async (req: Request, res: Response) => {
    if (this.validationHook(req, res)) return;

    try {
      const getUserDTO: IGetUserDTO = new GetUserDTO(req.body);
      const user: UserEntity = await this.usersService.getUser(getUserDTO);
      res.json({ user });
    } catch (error) {
      res.json(error.message);
    }
  };
}

export default UsersController;

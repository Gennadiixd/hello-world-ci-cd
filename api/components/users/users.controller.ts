import { injectable } from "tsyringe";

export interface IUsersController {
  deleteUser: (req: Request, res: Response) => void;
  updateUser: (req: Request, res: Response) => void;
  createUser: (req: Request, res: Response) => void;
}

@injectable()
class UsersController implements IUsersController {
  constructor() {}

  deleteUser = async () => {};
  updateUser = async () => {};
  createUser = async () => {};
}

export default UsersController;

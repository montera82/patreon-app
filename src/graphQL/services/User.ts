import User from "../../api/database/models/User";
import { NewUserInterface, UserInterface } from "../interfaces";

export default class UserDatasource {
  static async getUsers(): Promise<UserInterface[]> {
    return User.query();
  }

  static async getUser(id: number): Promise<UserInterface> {
    return User.query().findById(id)
  }

  static async createUser(user: NewUserInterface): Promise<UserInterface> {
    return User.query().insert(user)
  }
}
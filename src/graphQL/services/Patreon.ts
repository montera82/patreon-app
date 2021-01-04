import Patreon from "../../api/database/models/Patreon";
import { PatreonInterface } from '../interfaces';

export default class PatreonDatasource {
  static async getPatreons(): Promise<PatreonInterface[]> {
    return Patreon.query();
  }

  static async getPatreon(id: number): Promise<PatreonInterface> {
    return Patreon.query().findById(id)
  }

  static async getUserPatreons(userId: number): Promise<PatreonInterface[]> {
    return Patreon.query().where('user_id', '=', userId)
  }
}
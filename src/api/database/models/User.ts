import { Model } from 'objection'
import knex from '../knex'

Model.knex(knex)

export default class User extends Model{
  id!: number
  name!: string
  patreon_email!: string
  patreon_password!: string
  patreon_last_scrap: string

  static get tableName() {
    return 'users'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        patreon_email: { type: 'string'},
        patreon_password: {type: 'string'},
        patreon_last_scrap: {type: 'date'}
      }
    }
  }

  static get relationMappings() {
    const Patreon  = require('./patreon')
    return {
      patreon: {
        relation: Model.HasManyRelation,
        modelClass: Patreon,
        join: {
          from: 'users.id',
          to: 'patreons.user_id'
        }
      }
    }
  }
}

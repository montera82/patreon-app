import { Model } from 'objection'
import knex from '../knex'

Model.knex(knex)

export default class Patreon extends Model{
  id!: number
  user_id!: number
  patrons: number
  per_month: number

  static get tableName() {
    return 'patreons'
  }

  static get relationMappings(){
    const User = require('./user')
    
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'patreon.user_id',
          to: 'users.id'
        }
      }
    }
  }

 
}


import * as Knex from "knex";


export async function up(knex: Knex) {
  return knex.schema.createTable('patreons', table => {
    table.increments('id')
    table.integer('patrons')
    table.decimal('per_month', 15, 2)
    table.integer('user_id')
  })

}


export async function down(knex: Knex) {
  return knex.schema.dropTable('patreons')
}


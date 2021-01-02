import * as Knex from "knex";


export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('name')
    table.string('patreon_email')
    table.string('patreon_password')
    table.dateTime('patreon_last_scrap')
  })

}


export async function down(knex: Knex) {
  return knex.schema.dropTable('users')
}


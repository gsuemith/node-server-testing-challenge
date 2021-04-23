
exports.up = function(knex) {
  return knex.schema
    .createTable('bloggers', tbl => {
      tbl.increments()
      tbl.string('email', 64).unique().notNullable()
      tbl.string('name', 128).notNullable()
      tbl.text('password').notNullable()
    })
    .createTable('posts', tbl => {
      tbl.increments()
      tbl.string('title').notNullable()
      tbl.string('content', 4096).notNullable()
      tbl.timestamp('created').defaultTo(knex.fn.now())
      tbl.timestamp('modified').defaultTo(knex.fn.now())
      tbl.integer('blogger_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('bloggers')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
    })
    .createTable('comments', tbl => {
      tbl.increments()
      tbl.string('content').notNullable()
      tbl.timestamp('created').defaultTo(knex.fn.now())
      tbl.timestamp('modified').defaultTo(knex.fn.now())
      tbl.integer('blogger_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('bloggers')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
      tbl.integer('post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('posts')
    .dropTableIfExists('users')
};

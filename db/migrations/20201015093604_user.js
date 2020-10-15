exports.up = function (knex) {
    return knex.schema.createTable('user', (tableBuilder => {
        tableBuilder.increments();
        tableBuilder.string('username').notNullable();
        tableBuilder.string('password').notNullable();
        tableBuilder.boolean('is_admin').notNullable();
    }));
};

exports.down = function (knex) {
    return knex.schema.dropTable('user');
};

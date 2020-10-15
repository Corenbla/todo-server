exports.up = function (knex) {
    return knex.schema.createTable('article', (tableBuilder => {
        tableBuilder.increments();
        tableBuilder.text('content').notNullable();
        tableBuilder.string('title').notNullable();
        tableBuilder.integer('author_id').notNullable();
        tableBuilder.foreign('author_id').references('user.id').onDelete('cascade');
        tableBuilder.timestamps(true, true);
    }));
};

exports.down = function (knex) {
    return knex.schema.dropTable('article');
};

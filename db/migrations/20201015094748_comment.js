exports.up = function (knex) {
    return knex.schema.createTable('comment', (tableBuilder => {
        tableBuilder.increments();
        tableBuilder.text('content').notNullable();
        tableBuilder.integer('article_id').notNullable();
        tableBuilder.foreign('article_id').references('article.id').onDelete('cascade');
        tableBuilder.integer('author_id').notNullable();
        tableBuilder.foreign('author_id').references('user.id').onDelete('cascade');
        tableBuilder.timestamps(true, true);
    }));
};

exports.down = function (knex) {
    return knex.schema.dropTable('comment');
};

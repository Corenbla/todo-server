// Update with your config settings.

module.exports = {
    client: process.env.DATABASE_CLIENT || 'pg',
    connection: {
        database: process.env.DATABASE_NAME || 'todo',
        user: process.env.DATABASE_USERNAME || 'todo',
        password: process.env.DATABASE_PASSWORD || 'todo',
        host: process.env.DATABASE_IP || '0.0.0.0',
        port: process.env.DATABASE_PORT || 5432,
    },
    migrations: {
        directory: './db/migrations',
        tableName: 'knex_migrations',
    },
    seeds: {
        directory: './db/seeds',
    },
};

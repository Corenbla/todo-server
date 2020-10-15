exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('user').del()
        .then(function () {
            // Inserts seed entries
            return knex('user').insert([
                {
                    username: 'foo',
                    password: 'bar',
                    is_admin: true,
                },
                {
                    username: 'Jhon Doe',
                    password: '1234',
                    is_admin: false,
                },
                {
                    username: 'Alice',
                    password: '1234',
                    is_admin: false,
                },
            ]);
        })
    ;
};

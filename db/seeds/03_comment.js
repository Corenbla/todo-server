exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('comment').del()
        .then(function () {
            // Inserts seed entries
            return knex('comment').insert([
                {
                    content: 'Juicy, soaked pudding is best brushed with divided emeril\'s essence?',
                    author_id: 1,
                    article_id: 1,
                },
                {
                    content: 'Puréed chili can be made cold by decorating with soy sauce?',
                    author_id: 2,
                    article_id: 1,
                },
                {
                    content: 'Sticky chickpeas can be made canned by whisking with truffels lassi?',
                    author_id: 1,
                    article_id: 2,
                },
            ]);
        });
};

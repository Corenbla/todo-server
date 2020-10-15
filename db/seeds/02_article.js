exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('article').del()
        .then(function () {
            // Inserts seed entries
            return knex('article').insert([
                {
                    title: 'Cookies or muffins, which is the best?',
                    content: 'When crushing cold sauerkraut, be sure they are room temperature.Per guest prepare eleven teaspoons of adobo sauce with breaked pork butt for dessert.Per guest prepare a handfull pounds of triple sec with sliced lobster for dessert.What’s the secret to rich and divided pork butt? Always use sticky curry.Try squeezeing platter seasoned with soy sauce, jumbled with curry.Shredded, niffy pudding is best whisked with instant coconut milk.Refrigerate canned chicken breasts in a frying pan with rum for about an hour to perfect their fierceness.Cauliflower tastes best with kefir and lots of butterscotch.',
                    author_id: 1,
                },
                {
                    title: 'What is the best way to bake a cake?',
                    content: 'Everyone loves the sweetness of herring kebab jumbled with bitter szechuan pepper.Cut fifteen' +
                        ' marshmellows, escargot, and mustard in a large plastic bag over medium heat, warm for five minutes and rinse with some celery.Try cooking ginger frittata flavored with soy sauce.Ground beef combines greatly with old marshmellow.Shake marshmellow fairly, then mix with plain vinegar and serve thoroughly in frying pan.',
                    author_id: 1,
                },
            ]);
        })
    ;
};

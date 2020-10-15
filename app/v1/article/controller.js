const {to} = require('await-to-js');
const R = require('ramda');

const db = require.main.require('./helpers/db.js');
const logger = require.main.require('./helpers/logger.js');
const {createSchema} = require('./schema.js');

const getAll = async (req, res) => {
    const {title} = req.query;

    const [articleErr, article] = await to(
        db('article')
            .select()
            .where((builder) =>
                !R.isNil(title)
                    ? builder.where('title', 'like', `%${title}%`)
                    : builder,
            ),
    );
    if (!R.isNil(articleErr)) {
        logger.error(articleErr);
        return res.status(500).json({error: `${articleErr}`});
    }

    return res.status(200).json(article);
};

const getById = async (req, res) => {
    const {id} = req.params;

    const [articleErr, article] = await to(db('article').select().where({id}));
    if (!R.isNil(articleErr)) {
        logger.error(`${articleErr}`);
        return res.status(500).json({error: `${articleErr}`});
    }

    const [commentErr, comments] = await to(db('comment').select().where({article_id: id}));
    if (!R.isNil(commentErr)) {
        logger.error(`${commentErr}`);
        return res.status(500).json({error: `${commentErr}`});
    }

    if (R.isEmpty(article)) {
        const error = `No article for id ${id}`;
        logger.error(error);
        return res.status(400).json({error});
    }

    return res.status(200).json({...article[0], comments: comments});
};

const createArticle = async (req, res) => {
    // Validate input with Joi schema
    const {error: schemaErr, value: body} = createSchema.validate(req.body);
    body.author_id = req.user.id;

    if (!R.isNil(schemaErr)) {
        const error = `Error in input (err: ${schemaErr})`;
        logger.error(error);
        return res.status(400).json({error});
    }

    const [articleErr, article] = await to(db('article').insert(body).returning('*'));
    if (!R.isNil(articleErr)) {
        logger.error(`${articleErr}`);
        return res.status(500).json({error: `${articleErr}`});
    }

    if (R.isEmpty(article)) {
        const error = 'No row written';
        logger.error(error);
        return res.status(500).json({error});
    }

    return res.status(200).json(article[0]);
};

const updateArticle = async (req, res) => {
    const {id} = req.params;

    // Validate input with Joi schema
    const {error: schemaErr, value: body} = createSchema.validate(req.body);
    if (!R.isNil(schemaErr)) {
        const error = `Error in input (err: ${schemaErr})`;
        logger.error(error);
        return res.status(400).json({error});
    }

    const [articleErr, article] = await to(
        db('article').where({id})
    );
    if (!R.isNil(articleErr)) {
        logger.error(`${articleErr}`);
        return res.status(500).json({error: `${articleErr}`});
    }

    if (req.user.id != article[0].author_id) {
        return res.sendStatus(403);
    }

    const [articleUpdateErr, articleUpdate] = await to(
        db('article')
            .update({...body, updated_at: new Date()})
            .where({id})
            .returning('*'),
    );
    if (!R.isNil(articleUpdateErr)) {
        logger.error(`${articleUpdateErr}`);
        return res.status(500).json({error: `${articleUpdateErr}`});
    }

    if (R.isEmpty(articleUpdate)) {
        const error = `No article for id ${id}`;
        logger.error(error);
        return res.status(500).json({error});
    }

    return res.status(200).json(articleUpdate[0]);
};

const deleteArticle = async (req, res) => {
    const {id} = req.params;

    if (!req.user.is_admin) {
        return res.sendStatus(403);
    }

    const [articleErr, article] = await to(
        db('article').del().where({id}).returning('*'),
    );
    if (!R.isNil(articleErr)) {
        logger.error(`${articleErr}`);
        return res.status(500).json({error: `${articleErr}`});
    }

    if (R.isEmpty(article)) {
        const error = `No article for id ${id}`;
        logger.error(error);
        return res.status(500).json({error});
    }

    return res.status(200).json(article[0]);
};

module.exports = {getAll, getById, createArticle: createArticle, updateArticle: updateArticle, deleteArticle: deleteArticle};

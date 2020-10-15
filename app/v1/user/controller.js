const {to} = require('await-to-js');
const R = require('ramda');
const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.JWT_SECRET;

const db = require.main.require('./helpers/db.js');
const logger = require.main.require('./helpers/logger.js');

const login = async (req, res) => {
    // Read username and password from request body
    const {username, password} = req.body;

    // Filter user from the users array by username and password
    const [userErr, user] = await to(
        db('user').select().where({username, password})
    );

    if (!R.isNil(userErr)) {
        logger.error(userErr);
        return res.status(500).json({error: `${userErr}`});
    }


    if (user[0]) {
        // Generate an access token
        const accessToken = jwt.sign(user[0], accessTokenSecret);

        return res.status(200).json({
            accessToken
        });
    } else {
        return res.status().send('Username or password incorrect');
    }
};

module.exports = {login};

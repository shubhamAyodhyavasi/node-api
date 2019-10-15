const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../modles/User')
const secret = process.env.SECRET;
module.exports = {
    getAll,
    create,
    authenticate,
    checkToken
}
async function getAll() {
    return await User.find().select('-hash')
}

async function create(userParam) {
    if (await User.findOne({ email: userParam.email })) {
        return {
            success: false,
            error: 'Email "' + userParam.email + '" is already taken'
        }
    }
    const user = new User(userParam)

    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10)
    }
    await user.save()

    return {
        success: true
    }
}

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
        return {
            success: false,
            error: "user not found"
        }
    } else if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, secret, {
            expiresIn: 60 * 60 * 24 * 7
        });
        return {
            success: true,
            user: { ...userWithoutHash },
            token
        };
    } else {
        return {
            success: false,
            error: "email or password is incorrect"
        };
    }
}

async function checkToken(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

// module.exports = {
//     checkToken: checkToken
// }

const { admin, getWhere } = require('./store/firebase');

async function decodeToken(token) {
    const decodeValue = await admin.auth().verifyIdToken(token);
    return decodeValue;
}

async function getRol(uid) {
    try {
        const clause = {
            atributte: 'id',
            operand: '==',
            value: uid
        }
        const query = await getWhere('users', clause)
        const user = query.find(user => uid === user.id)
        return user;
    } catch (error) {
        console.log(error.message);
        return null
    }
}

class Middleware {
    
    async accessTokenAdmin(req, res, next) {
        try {
            const token = req.headers.authorization;
            const userData = await decodeToken(token);
            const user = await getRol(userData.uid);
            console.log(user);
            if(user.role === 'admin'){
                return next();
            } 
            return res.json({state:403, message: 'Access denied, you\'re not an admin'});
        } catch (error) {
            console.log(error.message);
            return res.json({state:500, message: 'Internal error'});
        }
    }

    async accessTokenRecepcionist(req, res, next) {
        try {
            const token = req.headers.authorization;
            const userData = await decodeToken(token);
            const user = await getRol(userData.uid);
            if(user.role === 'admin' || user.rol === 'recepcionist'){
                return next();
            } 
            return res.json({state:403, message: 'Access denied, you\'re not an admin or recepcionist'});
        } catch (error) {
            console.log(error.message);
            return res.json({state:500, message: 'Internal error'});
        }
    }

    async accessTokenGuest(req, res, next) {
        try {
            const token = req.headers.authorization;
            const userData = await decodeToken(token);
            const user = await getRol(userData.uid);
            if(user.role === 'guest'){
                return next();
            } 
            return res.json({state:403, message: 'Access denied, you\'re not a guest'});
        } catch (error) {
            console.log(error.message);
            return res.json({state:500, message: 'Internal error'});
        }
    }
}

module.exports = new Middleware();
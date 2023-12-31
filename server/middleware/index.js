const admin = require('../config/firebase-config')

class Middleware {
    async decodeToken(req, res, next) {
        const token = req.headers.authorization.split(' ')[1]
        try {
            const decodeValue = await admin.auth().verifyIdToken(token)  
            if (decodeValue) {
                req.userId = decodeValue?.uid
                return next()
            }
            return res.json({ message: 'Unauthorized!' })
        } catch (error) {
            return res.json({ message: error.message })
        }
    }
}

module.exports = new Middleware()
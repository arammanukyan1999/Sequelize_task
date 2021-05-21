const models = require("../models");
const jwt = require('jsonwebtoken');

exports.verifyUser = (req, res) => {
    return new Promise((resolve, reject) => {
        let token = req.headers.authorization
        if (!token) return res.status(401).send({ message: 'No token provided', statusCode: 401 })
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
            if (!token || token === '') res.status(401).send({ res, message: 'No token provided', statusCode: 401 })
        }
        jwt.verify(token, 'secret', (err, authData) => {
            if (err) {
                reject({
                    success: false,
                    message: 'Error',
                })
            }
            if (!authData) {
                reject({
                    success: false,
                    message: 'Error:Invalid',
                })
            } else {
                resolve({
                    success: true,
                    message: "Good",
                    authData,
                    len: authData.length
                })
            }
        })
    })

}
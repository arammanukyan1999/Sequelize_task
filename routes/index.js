var router = require('express').Router();

router.use('/api/users', require('../Router/userRouter'));

module.exports = router;
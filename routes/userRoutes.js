const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Show User
router.get('/:id', userController.getUser, (req, res) => {
    res.render('users/show', { user: res.locals.user });
  });

router.get('/:id', userController.getUser)
router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.auth, userController.deleteUser)

module.exports = router
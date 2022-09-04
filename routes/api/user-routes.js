const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

//GET and POST requests w/ id
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//GET, PUT, and DEL request w id    
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
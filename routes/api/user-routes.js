const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserbyId
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
    .put(updateUserById)
    .delete(deleteUserbyId);

module.exports = router;
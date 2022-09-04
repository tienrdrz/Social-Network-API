const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtbyId
} = require('../../controllers/thought-controller');

//GET and POST requests w/ id
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

//GET, PUT, and DEL request w id    
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtbyId);

module.exports = router;
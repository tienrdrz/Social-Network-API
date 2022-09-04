const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
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
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);
    
module.exports = router;
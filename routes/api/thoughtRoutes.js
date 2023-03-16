const router = require('express').Router()

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').get(getThoughts).post(createThought)

// /api/thoughts/:id
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).post(updateThought)

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/:reactionId').post(addReaction).delete(deleteReaction)

module.exports = router
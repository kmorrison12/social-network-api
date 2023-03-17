const { User, Thought } = require('../models')

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughtData) => res.json(thoughtData))
        .catch((err) => res.status(500).json(err))
    },

    // get single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thoughtData) =>
            !thoughtData
                ? res.status(404).json({ message: 'Thought does not exist' })
                : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err))
    },

    // create new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },

    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { thought: { _id: req.params.thoughtId } } }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res
                        .status(404)
                        .json({ message: 'Thought does not exist' })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err))
    },

    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thoughtData) =>
            !thoughtData
                ? res.status(404).json({ message: 'Does not exist' })
                : Thought.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { message: 'Thought deleted' }
                )
        )
    },

    // add reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { thoughts: { _id: req.params.id } } }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res
                        .status(404)
                        .json({ message: 'Does not exist' })
                    : res.json(userData)
            )
            .catch((err) => res.status(500).json(err))
    },

    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndRemove({ _id: req.params.id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User does not exists' })
                    : User.findOneAndUpdate(
                        { user: req.params.id },
                        { $pull: { friends: req.params.id } },
                        { message: 'Friend deleted' }
                    )
            )
    }
}

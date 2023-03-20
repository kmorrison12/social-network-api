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
            { $set: req.body }
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
                        // { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                    )
            )
            .then(() => res.json({ message: 'Thought deleted' }))
            .catch((err) => res.status(500).json(err))

    },

    // add reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } }
        )
            .populate({ path: 'reactions' })
            .then((reactionData) =>
                !reactionData
                    ? res
                        .status(404)
                        .json({ message: 'Does not exist' })
                    : res.json(reactionData)
            )
            .catch((err) => res.status(500).json(err))
    },

    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
        )
            .then((reactionData) =>
                !reactionData
                    ? res.status(404).json({ message: 'Does not exists' })
                    : res.json({ message: 'Reaction deleted' })
            )
            .catch((err) => res.status(500).json(err))

    }
}

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
        Thought.findOne({ _id: req.params.id })
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
            { _id: req.params.id },
            { $pull: { thought: { _id: req.params.id } } }
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

    // add reaction

    // delete reaction

}

const { ObjectId } = require('mongoose').Types
const { User } = require('../models')


module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err))
    },

    // get single user by _id and populate thought and friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({ path: 'thoughts' })
            .populate({ path: "friends"})
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: 'User does not exist' })
                    : res.json(userData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // post new user (username and email)
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },

    // update user by _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { user: { _id: req.params.id } } }
        )
            .then((userData) =>
                !userData
                    ? res
                        .status(404)  
                        .json({ message: 'User does not exist' })
                    : res.json(userData)
            )
            .catch((err) => res.status(500).json(err))
    },

    // delete user by _id
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User does not exist' })
                    : User.findOneAndUpdate(
                        { user: req.params.id },
                        { $pull: { user: req.params.id } },
                        { message: 'User deleted' }
                    )
            )
    },

    // post to add new friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { friends: { _id: req.params.id } } }
        )
            .then((userData) =>
                !userData
                    ? res
                        .status(404)
                        .json({ message: 'User does not exist' })
                    : res.json(userData)
            )
            .catch((err) => res.status(500).json(err))
    },

    // delete friend
    deleteFriend(req, res) {
        User.findOneAndRemove({ _id: req.params.id })
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
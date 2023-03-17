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
            .populate({ path: "friends" })
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
            .then((userData) => res.json({message: 'User created'}))
            .catch((err) => res.status(500).json(err));
    },

    // update user by _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
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
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User does not exist' })
                    : User.findOneAndUpdate(
                        { $pull: { user: req.params.id } },
                    )
            )
            .then(() => res.json({ message: 'User deleted' }))
            .catch((err) => res.status(500).json(err))
    },

    // post to add new friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { friends: req.params.friendId } }
        )
            .populate({ path: 'friends' })
            .then((userData) =>
                !userData
                    ? res
                        .status(404)
                        .json({ message: 'User does not exist' })
                    : res.json({message: 'Friend added'})
            )
            .catch((err) => res.status(500).json(err))
    },

    // delete friend
    deleteFriend(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User does not exists' })
                    : User.findOneAndUpdate(
                        { $pull: { friends: { _id: req.params.friendId } } }
                    )
            )
            .then(() => res.json({ message: 'Friend deleted' }))
            .catch((err) => res.status(500).json(err))

    }
}
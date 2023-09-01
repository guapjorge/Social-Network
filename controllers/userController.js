const{ objectId } = require("mongoose").Types;
const { User, Reaction, Thought } = require("../models");

module.exports = {

    async getUsers(req, res) {
        try {
            console.log("rfrg")
            const users = await User.find();
console.log("rfrg")
            console.log(users);

            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getOneUser(req, res) {
        try {
            const users = await User.findOne({
                _id: req.params.id,
            });
        
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const users = await User.create(req.body);


            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const users = await User.findOneAndUpdate(
                {_id: req.params.id},
                { $set: req.body},
                { runValidators: true, new: true }
            );


            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
     
    async deleteUser(req, res) {
        try {
            const users = await User.findOneAndRemove({ _id: req.params.id})
         
                await Thought.deleteMany({ _id: { $in: users.thoughts} });


            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const friends = await User.findOneAndUpdate(
                {_id: req.params.id},
                { $addToSet: { friends: req.params.friendId} },
                { new: true}
            );
            console.log(friends)

            res.json(friends);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }, 
    async deleteFriends(req, res) {
        try {
            const friends = await User.findOneAndUpdate(
                {_id: req.params.id},
                { $pull: { friends: req.params.friendId} },
                { new: true}
            );

            res.json(friends);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }, 

}
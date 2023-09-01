const { ObjectId } = require("mongoose").Types;
const { Thought, User, Reaction } = require("../models");
// const { findOneAndUpdate } = require("../models/Thought");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getOneThought(req, res) {
        try {
            console.log(req.params.id)
            const thoughts = await Thought.findOne({ _id: req.params.id });
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async newThought(req, res) {
        try {
            const thoughts = await Thought.create(req.body);
            await User.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { thoughts: thoughts._id } },
                { new: true }

            )
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(req.body);
            await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { thoughts: thoughts._id } },
                { runValidators: true, new: true }
            )
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thoughts = await Thought.findOneAndDelete({
                _id: req.params.id,
            })
            const userThought = User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { thoughts: req.params.id } },
                { new: true }
            )
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reactions: req.body } },
                { new: true })
            res.json(reaction);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { new: true })
            res.json(reaction);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
}
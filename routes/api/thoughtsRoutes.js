const router = require("express").Router();
const {
    getThoughts,
    getOneThought,
    newThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction, 
} = require("../../controllers/thoughtsController")

router.route("/").get(getThoughts).post(newThought);

router.route("/:id").get(getOneThought).put(updateThought).delete(deleteThought);

router.route("/:id/reaction").post(createReaction)

router.route("/:id/reaction/:reactionId").delete(deleteReaction);

module.exports = router;

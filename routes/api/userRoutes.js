const router = require ("express").Router()

const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriends,
} = require ("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriends);

module.exports = router
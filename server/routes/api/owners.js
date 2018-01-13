const router = require("express").Router();
const ownersController = require("../../controller/owner");

//Matches with "/api/owners"
router.route("/")
    .get(ownersController.findAll)
    .post(ownersController.create);

//Matches with "/api/owners/:id"
router.route("/id/:id")
    .get(ownersController.findById)
    .put(ownersController.update)
    .delete(ownersController.remove);

router.route("/loginout/") 
    .post(ownersController.login)
    .get(ownersController.logout);

router.route("/authenticate") 
    .get(ownersController.authenticate);

module.exports = router;
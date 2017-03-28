var express = require('express');
var router = express.Router();

var ctrUsers=require('../controllers/users.controllers.js');
var ctrPolls=require('../controllers/polls.controllers.js');

//poll routes
router
.route('/polls')
.get(ctrUsers.authenticate,ctrPolls.pollsGetAll)
.post(ctrUsers.authenticate,ctrPolls.pollsAddOne);

router.route('/poll/:creator/:title')
.get(ctrPolls.pollsGetOne)
.put(ctrPolls.pollUpdateOne)
.post(ctrUsers.authenticate,ctrPolls.pollUpdate)
.delete(ctrUsers.authenticate,ctrPolls.pollsDeleteOne);

router.route('/popular')
.get(ctrPolls.pollsGetPopular);

//authentication
router
.route('/users/register')
.post(ctrUsers.register);

router
.route('/users/login')
.post(ctrUsers.login);


module.exports = router;






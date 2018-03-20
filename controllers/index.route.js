const express = require('express');
const router = express.Router();
const model = require('../models/activities.model')

router.get('/', function (request, response) {
	//console.log(request.isAuthenticated());

	model.listClientes(function (clients) {

		model.listUsers(function (users) {


			response.set("Content-Type", "text/html");
			response.render('./index', {
				clients: clients,
				users: users
			})
		})
	})

});


module.exports = router;
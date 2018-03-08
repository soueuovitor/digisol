const express = require('express');
const router = express.Router();
const model = require('../models/activities.model')
router.get('/', function(request, response){
	//console.log(request.isAuthenticated());

	model.listClientes(function (clientes) {

	response.set("Content-Type", "text/html");
	response.render('./activities', {
		clientes: clientes
	})
});

});


module.exports = router;
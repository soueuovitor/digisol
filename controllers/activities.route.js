const express = require('express');
const router = express.Router();
const model = require('../models/activities.model')
router.get('/', function (request, response) {
	//console.log(request.isAuthenticated());

	model.listClientes(function (clients) {

		model.listUsers(function (users) {
			model.listActividades(function (activities) {

			response.set("Content-Type", "text/html");
			response.render('./activities', {
				clients: clients,
				users: users,
				activities : activities
			})
		})
	})

	});

});

router.post('/fim', function(request, response){


	var t = request.body.timeStart.split(/[- :]/);
	var horaInicio = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

// Apply each element to the Date function
	var fim = request.body.timeEnd.split(/[- :]/);
	var horaFim = new Date(Date.UTC(fim[0], fim[1]-1, fim[2],fim[3], fim[4], fim[5]));

	var seconds = (horaFim.getTime() - horaInicio.getTime()) / 1000;

	console.log(seconds + ' '+ horaFim)

	var data = {

		'id': request.body.id,

		'time': request.body.timeEnd
	
	};


	model.fimAct(data, function () {});




});


router.post('/restart', function(request, response){




	var data = {

		'id': request.body.id,

		
	};
	model.restartAct(data, function () {});




});
router.post('/inicio', function(request, response){




	var data = {

		'id': request.body.id,

		'time': request.body.time
	};
	model.inicioAct(data, function () {});




});

router.post('/newToDo', function(request, response){




	var data = {

		'cliente': request.body.cliente,
		'user': request.body.user,
		'titulo': request.body.titulo,
		'descricao': request.body.descricao,
		'tipo': request.body.tipo
	};
	model.createToDo(data, function () {});


	response.json({
		success: "Updated Successfully",
		status: 200
	});


})

module.exports = router;
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
/*
	Number.prototype.toTime = function(isSec) {
		var ms = isSec ? this * 1e3 : this,
			lm = ~(4 * !!isSec),  
			fmt = new Date(ms).toISOString().slice(11, lm);
	
		if (ms >= 8.64e7) {  
			var parts = fmt.split(/:(?=\d{2}:)/);
			parts[0] -= -24 * (ms / 8.64e7 | 0);
			return parts.join(':');
		}
	
		return fmt;
	};

	var horaInicio = new Date(request.body.timeStart).getTime();


// Apply each element to the Date function
	var horaFim = new Date(request.body.timeEnd).getTime();

	var seconds = (horaFim - horaInicio) / 1000;

	console.log(seconds);
var duracao = (seconds .toTime(true))
console.log(duracao);
*/
	var data = {

		'id': request.body.id,

		'time': request.body.timeEnd,
	};


	model.fimAct(data, function () {});




});

router.post('/increment', function(request, response){

	Number.prototype.toTime = function(isSec) {
		var ms = isSec ? this * 1e3 : this,
			lm = ~(4 * !!isSec),  /* limit fraction */
			fmt = new Date(ms).toISOString().slice(11, lm);
	
		if (ms >= 8.64e7) {  /* >= 24 hours */
			var parts = fmt.split(/:(?=\d{2}:)/);
			parts[0] -= -24 * (ms / 8.64e7 | 0);
			return parts.join(':');
		}
	
		return fmt;
	};
	var horaInicio = new Date(request.body.start).getTime();


// Apply each element to the Date function
	var horaFim = new Date(request.body.end).getTime();

	var seconds = (horaFim - horaInicio) / 1000;

	console.log(seconds);
var duracao = (seconds .toTime(true))
console.log(duracao);

	var data = {

		'id': request.body.id,
		'start': request.body.start,
		'end': request.body.end,
		'duration': duracao
	};


	model.increment(data, function () {});




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
const express = require('express');
const router = express.Router();
const model = require('../models/activities.model');
router.get('/', function(request, response) {
	//console.log(request.isAuthenticated());

	model.listClientes(function(clients) {
		model.listTipos(function(tipos) {

			model.listUsers(function(users) {
				model.listActividades(function(activities) {

					response.set("Content-Type", "text/html");
					response.render('./activities', {
						clients: clients,
						users: users,
						activities: activities,
						tipos: tipos
					});
				});
			});
		});

	});

});

router.post('/fim', function(request, response) {
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


	model.fimAct(data, function() {});




});

router.post('/increment', function(request, response) {

	Date.prototype.getWeekNumber = function() {
		var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
		var dayNum = d.getUTCDay() || 7;
		d.setUTCDate(d.getUTCDate() + 4 - dayNum);
		var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
		return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
	};
	Number.prototype.toTime = function(isSec) {
		var ms = isSec ? this * 1e3 : this,
			lm = ~(4 * !!isSec),
			/* limit fraction */
			fmt = new Date(ms).toISOString().slice(11, lm);

		if (ms >= 8.64e7) { /* >= 24 hours */
			var parts = fmt.split(/:(?=\d{2}:)/);
			parts[0] -= -24 * (ms / 8.64e7 | 0);
			return parts.join(':');
		}

		return fmt;
	};


	Date.prototype.getWeekOfMonth = function(exact) {
		var month = this.getMonth(),
			year = this.getFullYear(),
			firstWeekday = new Date(year, month, 1).getDay(),
			lastDateOfMonth = new Date(year, month + 1, 0).getDate(),
			offsetDate = this.getDate() + firstWeekday - 1,
			index = 1, 
			weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7),
			week = index + Math.floor(offsetDate / 7);
		if (exact || week < 2 + index) return week;
		return week === weeksInMonth ? index + 5 : week;
	};

	var horaInicio = new Date(request.body.start).getTime();
	var inicio = new Date(request.body.start);
	var week = inicio.getWeekOfMonth(true);
	var month = inicio.getMonth() + 1;
	// Apply each element to the Date function
	var horaFim = new Date(request.body.end).getTime();
	
	var seconds = (horaFim - horaInicio) / 1000;

	console.log(month);
	var duracao = (seconds.toTime(true));
	console.log(duracao);

	var data = {

		'id': request.body.id,
		'start': request.body.start,
		'end': request.body.end,
		'duration': duracao,
		'week': week,
		'month': month,
		'user': request.body.user
	};


	model.increment(data, function() {});




});


router.post('/restart', function(request, response) {




	var data = {

		'id': request.body.id,


	};
	model.restartAct(data, function() {});




});
router.post('/inicio', function(request, response) {




	var data = {

		'id': request.body.id,

		'time': request.body.time
	};
	model.inicioAct(data, function() {});




});

router.post('/newToDo', function(request, response) {




	var data = {

		'cliente': request.body.cliente,
		'user': request.body.user,
		'titulo': request.body.titulo,
		'descricao': request.body.descricao,
		'tipo': request.body.tipo,
		'sub': request.body.subtipo,
		'dataLimite': request.body.dataLimite
	};
	model.createToDo(data, function() {});


	response.json({
		success: "Updated Successfully",
		status: 200
	});


});

module.exports = router;

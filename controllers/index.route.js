const express = require('express');
const router = express.Router();
const model = require('../models/activities.model')

router.get('/', function (request, response) {
	//console.log(request.isAuthenticated());

	model.listClientes(function (clients) {
		model.listActividades(function (activities) {

			model.listUsers(function (users) {





				function timeToMins(time) {
					var b = time.split(':');
					return b[0] * 60 + +b[1];
				}

				// Convert minutes to a time in format hh:mm
				// Returned value is in range 00  to 24 hrs
				function timeFromMins(mins) {
					function z(n) {
						return (n < 10 ? '0' : '') + n;
					}
					var h = (mins / 60 | 0) % 24;
					var m = mins % 60;
					return z(h) + ':' + z(m);
				}

				// Add two times in hh:mm format
				function addTimes(t0, t1) {
					return timeFromMins(timeToMins(t0) + timeToMins(t1));
				}


				var usersGraph = new Array();
				/* usersGraph.push[{
						'user': "vitor",
						'horasAcordadas': 12,
						'duracao' : 10	
	
					
					}]
					*/



				for (var u of users) {
					var user = u.nome_utilizador;
					var duracao = '00:00:00';
					var horaAcordada = u.horas_diarias
					for (var a of activities) {
						if (a.id_utilizador == u.id_utilizador) {
							duracao = addTimes(duracao, a.duracao);
							console.log('here' + ' ' + duracao)

						}


					
					
					}
					//console.log(user + ' ' + horaAcordada + ' ' + duracao)
/*					usersGraph.push[{
						'user': "vitor",
						'horasAcordadas': 12,
						'duracao' : 10	

}]*/
		function cleanUp(time){

		var finalTime=	time.split(':');
		var final = new Array()
		final.push([finalTime[0]]);
			final.push([finalTime[1]])
	return final
		}
	
					horaAcordada = cleanUp(horaAcordada);
					duracao = cleanUp(duracao);
					usersGraph.push({
							'user': user,
							'horas':horaAcordada,
							'reais':duracao 	
					})



					for (var a of usersGraph) {


						console.log(a)
					}
				}
			response.set("Content-Type", "text/html");
				response.render('./index', {
					clients: clients,
					users: users,
					graphUsers: usersGraph
					
				
				})
			})
		})

	})

});


module.exports = router;

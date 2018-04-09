const express = require('express');
const router = express.Router();

const model = require('../models/activities.model')

router.get('/', function(request, response) {
  //console.log(request.isAuthenticated());

  model.listClientes(function(clients) {
    model.listActividades(function(activities) {
      model.listHoras(function(hours) {
        model.listUsers(function(users) {





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


          for (var u of users) {
            var user = u.nome_utilizador;
            var id_user = u.id_utilizador;
            var horaAcordada = u.horas_diarias
            var mes = 0;
            var semana = 0;

            var duracao = '00:00:00';




            for (var h of hours) {

              if (h.id_utilizador == id_user) {
                var mes = h.mes;
                var semana = h.semana;
                duracao = h.duracao_sessao;


                for (var h2 of hours) {

                  if (mes == h2.mes && semana == h2.semana && h.id != h2.id && h2.id_utilizador == id_user) {


                    duracao = addTimes(duracao, h2.duracao_sessao);
                    console.log('fds estou aqui' + duracao);
                  }



                }




              }
            }
	horaAcordada = cleanUp(horaAcordada);
	duracao = cleanUp(duracao);
            usersGraph.push({
              'user': user,
              'horas': horaAcordada,
              'reais': duracao,
              'mes': mes,
              'semana': semana
            })


            function cleanUp(time) {

              var finalTime = time.split(':');
              var final = new Array()
              final.push([finalTime[0]]);
              final.push([finalTime[1]])
              return final
            }


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

  })

});


module.exports = router;

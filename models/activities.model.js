module.exports = {




	listClientes(callback) {
		var sql = 'SELECT * from clientes';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);

		});
    },
	listActividades(callback) {
		var sql = 'SELECT * from actividades';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);

		});
    },
    
    listUsers(callback) {
		var sql = 'SELECT * from utilizadores';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);

		});
    },
    inicioAct(data,callback){
		var sql = "UPDATE actividades SET hora_inicio=? WHERE id_actividade=?";
		global.connection.query(
			sql, [data.time,  data.id],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});


	},
	fimAct(data,callback){
		var sql = "UPDATE actividades SET hora_fim=?  WHERE id_actividade=?";
		global.connection.query(
			sql, [data.time, data.id],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});


	},
	increment(data, callback){
		var sql = "INSERT INTO horas (actividade,duracao_sessao, inicio_sessao, fim_sessao) VALUES (?,?,?,?)";
		global.connection.query(
			sql, [data.id, data.duration, data.start, data.end],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});





	},

	restartAct(data,callback){
		var sql = "UPDATE actividades SET hora_fim=0 , hora_inicio=0 , duracao=0 WHERE id_actividade=?";
		global.connection.query(
			sql, [data.id],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});


	},
	createToDo(data, callback){
		var sql = "INSERT INTO actividades (nome_actividade, id_cliente_fk, id_utilizador, descricao,tipo) VALUES (?,?,?,?,?)";
		global.connection.query(
			sql, [data.titulo, data.cliente, data.user, data.descricao, data.tipo],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});





	},


	create(data, callback) {
		var sql = "INSERT INTO clientes (nome, morada, telemovel, email, nif, cc, num_fotos_cliente, data_nascimento) VALUES (?,?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.nome, data.morada, data.telemovel, data.email, data.nif, data.cc, data.num_fotos_cliente, data.data_nascimento],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	remove(data, callback) {
		var sql = "DELETE from clientes WHERE idclientes=?";
		global.connection.query(sql, [data], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
	update(data, callback) {
		var sql = "UPDATE clientes SET nome=?, morada=?, telemovel=?, email=?, nif=?, cc=?  WHERE idclientes=?";
		global.connection.query(
			sql, [data.nome, data.morada, data.telemovel, data.email, data.nif, data.cc, data.idclientes],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	/*
	takenUsername(username, callback) {
	    
	    var sql = "SELECT password FROM participantes WHERE username=?"
	    var user = global.connection.query(SQL, [username] );
	                                       
	                                       
	                function bit (error, rows, fields){
				     if (user === undefined)  {callback(true);
	                    }else{
	                        callback(false);
	                    }
	    }
	},
	                   
	*/


};
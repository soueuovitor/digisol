module.exports = {




	listClientes(callback) {
		var sql = 'SELECT * from clientes';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);

		});
    },
    
    listUsers(callback) {
		var sql = 'SELECT * from clientes';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);

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
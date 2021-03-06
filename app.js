const express = require('express');
const app = express();
var mysql = require('mysql');
const bodyParser = require('body-parser');

// Parser used to process insertion / modification request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database : 'Library',
  port     : '3306'
});

con.connect(function(err){
	if (err) console.log('Error');
	else console.log('Connected');
  //(err) ? console.log(err) : console.log(connection);
});

app.get('/api/books', (req, res) => {
  var sql = "SELECT * FROM bookview ORDER BY ISBNCode";
  con.query(sql, function(err, results) {
		if (err) throw err;
    res.json({books: results});
	});
	
	console.log("Res: ");
	console.log(res.data);
});


app.get('/api/admins', (req, res) => {
	
	var sql = "SELECT * FROM admin";
	con.query(sql, function(err, results) {
		if (err) throw err;
		console.log('admins: ');
		console.log(results);
		res.json({admins: results});
	})

});

app.get('/api/authors', (req, res) => {
	
	var sql = "SELECT * FROM author ORDER BY AId DESC";
	con.query(sql, function(err, results) {
		if (err) throw err;
		console.log('authors: ');
		console.log(results);
		res.json({authors: results});
	})

});

app.post('/api/insert/authors', function(req, res) {
	console.log(req);
  var sql = "INSERT "
          + "INTO author(AId, AName, ABirth) "
          + "VALUES('"
          +   req.body.aid+ "','" 
          +   req.body.aname + "','" 
					+   req.body.abirth+"')";
  try {con.query(sql, function (err, results) {
    if(err) throw err;
    res.json({authors: results});
	});
	} catch (err){
		console.log('Error: ', err)
	}
});
 
app.post('/api/insert/books', function(req, res) {
  var sql = "INSERT "
          + "INTO `library`.`book` "
          + "VALUES('"
          +   req.body.isbn+ "','" 
          +   req.body.title + "','" 
					+   req.body.publisher + "'," 
					+		req.body.year + "," 
					+ 	req.body.numpages +")";

	con.query(sql, function(err, results) {
		if (err) throw err;
		if (req.body.authorlist.length > 0){
			var sql2 = "INSERT INTO `library`.`write` VALUES" 
				+ req.body.authorlist.map(a => "('"+a+"','"+req.body.isbn+"')").join(',');

			con.query(sql2, function(err, results2){
				if (err) throw err;
				res.json({response: results + results2})
			});
		}				
		else {
		res.json({response: results});
		}
	});
});


app.post('/api/books/detail', (req, res) => {
  var sql = "CALL getbookdetail('" + req.body.isbn + "');";
  try {con.query(sql, function(err, results) {
		if (err) throw err;
		res.json({detail: results});
		console.log("Detail", results)
	});
	}
	catch (err){
		console.log('Error: ', err)
	}

	console.log("Res detail: " + req.body.isbn);
	console.log(res.data);
});

app.post('/api/books/copy', (req, res) => {
  var sql = "CALL getcopylist('" + req.body.isbn + "');";
  con.query(sql, function(err, results) {
		if (err) throw err;
    res.json({copylist: results});
	});
	
	console.log("Res detail: " + req.body.isbn);
	console.log(res.data);
});

/*
app.get('/api/test', (req, res) => {
  res.json({ message: 'I am a message from Server!'});
})
*/

app.listen(4000, () => console.log('App listening on port 4000'));

/*
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	var sql = "CREATE TABLE IF NOT EXISTS customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
	con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table created");
	});
	
	var sql = "INSERT INTO customers (name, address) VALUES ('CInc', 'Highway 37')";
	con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("1 record inserted");
	});  
	
	con.query("SELECT name, address FROM customers", function (err, result, fields) {
	if (err) throw err;
	console.log(result);
	console.log(fields);
	});

	con.query("SELECT * FROM customers WHERE address LIKE 'S%'", function (err, result) {
	if (err) throw err;
	console.log(result);
	});  
  
	var adr = 'Mountain 21';
	var sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr);
	con.query(sql, function (err, result) {
	  if (err) throw err;
	  console.log(result);
	});  
	
	var name = 'Amy';
	var adr = 'Mountain 21';
	var sql = 'SELECT * FROM customers WHERE name = ? OR address = ?';
	con.query(sql, [name, adr], function (err, result) {
	  if (err) throw err;
	  console.log(result);
	});
	
	var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
	con.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Number of records deleted: " + result.affectedRows);
	});	
	
	var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Highway 37'";
	con.query(sql, function (err, result) {
	if (err) throw err;
	console.log(result.affectedRows + " record(s) updated");
	});	
	
	
	var sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
	con.query(sql, function (err, result) {
	if (err) throw err;
	console.log(result);
	});	
	
});

*/
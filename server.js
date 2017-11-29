var express = require('express');
var app = express.Router();

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
	res.status(200).send('nothing to see here!');
});

app.get('/result', function(req, res) {
	
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// var java = spawn('java', ['java', '-cp', '"*"', '-Xmx2g edu.stanford.nlp.pipeline.StanfordCoreNLP',
	// 	'-annotators', 'tokenize,ssplit,pos,lemma,ner,parse,dcoref', req.query.text]);
	// var spawn = require('child_process').spawn;
	// var java = spawn('java', ['-mx4g', '-cp', '"*"', 'edu.stanford.nlp.pipeline.StanfordCoreNLPServer']);

	// var spawn = require('child_process').spawn;
	// var java = spawn('java', ['edu.stanford.nlp.parser.nndep.DependencyParser',
	// 	'-model', 'modelOutputFile.txt.gz', '-textFile', '-', '-outFile', '-']);

	// java.stdin.write('Hi, my name is Karrie'); 

	// java.stdout.on('data', function(data) {
	// 	console.log(data.toString());
	// });

	var spawn = require('child_process').spawn;
	var python = spawn('python', ['./analyze.py', req.query.text]);

	python.stdout.on('data', function(data) {
		var data = {
			locals: {
				text: data.toString()
			}
		}
		res.render('./result', data);
	});
});

app.listen(8080);
console.log('listening on port 8080');
var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/result', function(req, res) {
	var spawn = require('child_process').spawn;
	var python = spawn('python', ['./analyze.py', req.query.text]);
	python.stdout.on('data', function(data) {
		var data = {
			locals: {
				text: data.toString()
			}
		}
		res.render('./index', data);
	});
});

// app.get('/result', function(req, res) {
// 	// var java = spawn('java', ['java', '-cp', '"*"', '-Xmx2g edu.stanford.nlp.pipeline.StanfordCoreNLP',
// 	// 	'-annotators', 'tokenize,ssplit,pos,lemma,ner,parse,dcoref', req.query.text]);
// 	// var spawn = require('child_process').spawn;
// 	// var java = spawn('java', ['-mx4g', '-cp', '"*"', 'edu.stanford.nlp.pipeline.StanfordCoreNLPServer']);

// 	// var spawn = require('child_process').spawn;
// 	// var java = spawn('java', ['edu.stanford.nlp.parser.nndep.DependencyParser',
// 	// 	'-model', 'modelOutputFile.txt.gz', '-textFile', '-', '-outFile', '-']);

// 	// java.stdin.write('Hi, my name is Karrie'); 

// 	// java.stdout.on('data', function(data) {
// 	// 	console.log(data.toString());
// 	// });
// });

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
var express = require('express');
var app = express();

var WatsonNLU = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new WatsonNLU({
	'username': 'a314bf94-dd1d-461b-a851-c76eeea32057',
	'password': 'gZFirr37Ln4j',
	'version_date': '2017-02-27'
});

var ToneAnalyzer = require('watson-developer-cloud/tone-analyzer/v3');
var tone_analyzer = new ToneAnalyzer({
	username: 'ff68249b-e744-4d0a-8923-db4447b64cf6',
	password: '0fRXxBhaa7Hp',
	version_date: '2016-05-19'
});

var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('./index');
});

app.get('/analyze', function(req, res) {
	var query = {
		'text': req.query.text,
		'features': {
			'sentiment': {},
			'emotion': {}
		}
	}
	natural_language_understanding.analyze(query, function(err, nluData) {
		if (err) nluData = null;
		var query = {
			text: req.query.text,
			tones: 'language',
			sentences: false
		};
		tone_analyzer.tone(query, function(error, toneData) {
			if (error) {
				toneData2 = null;
			} else {
				var toneData2 = {};
				for (var i=0; i<toneData.document_tone.tone_categories[0].tones.length; i++) {
					toneData2[toneData.document_tone.tone_categories[0].tones[i].tone_id] = toneData.document_tone.tone_categories[0].tones[i].score;
				}
			}
			if (nluData == null) {
				var data = {
					sentiment: null,
					emotion: null,
					tone: toneData2
				}
			} else {
				var data = {
					sentiment: nluData.sentiment.document,
					emotion: nluData.emotion.document.emotion,
					tone: toneData2
				}
			}

			res.send(data);
		});
	});
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
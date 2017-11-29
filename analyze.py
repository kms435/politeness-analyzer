import sys, json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
# from pycorenlp import StanfordCoreNLP
# from stanfordcorenlp import StanfordCoreNLP
# from nltk.tokenize import sent_tokenize

def main(text):
	analyzer = SentimentIntensityAnalyzer()
	vs = analyzer.polarity_scores(text)
	print vs
	# nlp = StanfordCoreNLP('http://localhost:9000')
	# output = nlp.annotate(text, properties={
	# 	'annotators': 'depparse',
	# 	'outputFormat': 'json'
	# 	})
	# print output
	
	# nlp = StanfordCoreNLP('./corenlp')
	# sentences = sent_tokenize(text)
	# dependencies = []
	# sentences2=[]
	# for s in sentences:
	# 	z = nlp.word_tokenize(s)
	# 	d = nlp.dependency_parse(s)
	# 	for x in d:
	# 		x = x[1:len(x)-1]
	# 		x
	# 	sentences2.append(z)
	# 	dependencies.append(d)
	
	
	
if __name__ == '__main__':
	text = sys.argv[1]
	main(text)
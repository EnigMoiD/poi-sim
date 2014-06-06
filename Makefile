all: %.html

%.html: %.jade
	jade -o jade/* .

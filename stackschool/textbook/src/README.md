# Textbook Compilation

Latex template: [Kaobook](https://github.com/fmarotta/kaobook). 

To compile: 
```bash
$ pdflatex main # Compile template
$ makeindex main.nlo -s nomencl.ist -o main.nls # Compile nomenclature
$ makeindex main # Compile index
$ biber main # Compile bibliography
$ pdflatex main # Compile template
$ makeglossaries main # Compile glossary
$ pdflatex main # Compile template
```
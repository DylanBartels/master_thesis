#!/bin/sh

# Compiles all .tex files into pdf
echo "Compiling master thesis project plan"
cd thesis_plan
rm main.pdf
pdflatex main.tex
rm main.aux main.log main.out main.nlo main.toc
cd ..

echo "Compiling master thesis"
cd thesis
./makeidx.sh
pdflatex main.tex
bibtex main.aux
pdflatex main.tex
# rm main.aux main.log main.out main.nlo main.toc
cd ..

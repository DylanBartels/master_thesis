#!/bin/sh

# Compiles all .tex files into pdf
echo "Compiling master thesis project plan"
cd thesis_plan
pdflatex main.tex
rm main.aux main.log main.out
cd ..

echo "Compiling master thesis"
cd thesis
pdflatex main.tex
rm main.aux main.log main.out
cd ..

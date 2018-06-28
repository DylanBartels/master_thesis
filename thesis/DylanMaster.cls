
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%------ Identification -------%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{DylanMaster}[20/06/18 Dylan master thesis]
\LoadClass[fleqn, 12pt]{article}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%------- Class Options -------%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\DeclareOption{Nomencl}{\def\@nomencl{}} %Option acted upon at bottom.
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}
\ProcessOptions\relax

\ifdefined\@nomencl
    \RequirePackage{nomencl}
    \setlength{\nomitemsep}{-\parsep}
    \renewcommand*{\pagedeclaration}[1]{\unskip\dotfill\hyperpage{#1}}
    \makenomenclature
    %In CMD, makeindex main.nlo -s nomencl.ist -o main.nls   If the filename is not "main", just replace it.
    \renewcommand{\nomname}{List of Symbols}
\else\fi

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%----- Required Packages -----%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% geometry  : Document dimensions
% amsfonts  : Math symbols.
% amsmath   : Math formulas.
% bm        : It provides bold math symbols.
% booktabs  : Features for tables.
% graphicx  : Manages inclusion of graphic files (better than graphics)
% setspace  : Manages spacing in the document.
% float     : Put [H] after \begin{figure} to force position of figure.
% sectsty   : Used to have hline under new section.
% titlepage : title page customized by Dylan. use \mytitlepage.
% grffile   : allows spaces in file names.
% enumitem  : reduce space in lists. \begin{itemize}[nolistsep]
% subcaption: Subfigures.
% multicol  : For use with Excel2Latex
% pdfpages  : To use pdfpages, do \includepdf{document}
% url       : Allows for \url{}. Useful for bibliographies with url.
% hyperref  : Hyperlinks. Use \hypersetup{hidelinks} for no borders.
% cleveref  : can use \cref or \Cref to reference
% nomencl   : List of symbols -> \nomenclature{$symbol$}{description}
\RequirePackage[letterpaper, height=245mm, width=170mm]{geometry}
\RequirePackage{amsfonts, amsmath, bm}
\RequirePackage{booktabs}
\RequirePackage{graphicx}
\RequirePackage{setspace}
\RequirePackage{float}
\RequirePackage{sectsty}
\RequirePackage[space]{grffile}
\RequirePackage[shortlabels]{enumitem}
\RequirePackage{subcaption}
% \RequirePackage{bigstrut}
\RequirePackage{multicol}
\RequirePackage{multirow}
\RequirePackage{pdfpages}
\RequirePackage{url}
\RequirePackage{hyperref}
\RequirePackage{cleveref}
\RequirePackage{csquotes}
\RequirePackage{bera}
\RequirePackage{listings}
\RequirePackage{xcolor}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%---------- Options ----------%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\geometry{letterpaper, height=245mm, width=170mm}
\Crefname{equation}{Eq.}{Eqs.}
\setstretch{1}
\frenchspacing
\setlength{\skip\footins}{1cm}
\renewcommand{\mkbegdispquote}[2]{\itshape}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%----------- Json ------------%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\colorlet{punct}{red!60!black}
\definecolor{background}{HTML}{EEEEEE}
\definecolor{delim}{RGB}{20,105,176}
\colorlet{numb}{magenta!60!black}

\lstdefinelanguage{json}{
    basicstyle=\normalfont\ttfamily,
    numbers=left,
    numberstyle=\scriptsize,
    stepnumber=1,
    numbersep=8pt,
    showstringspaces=false,
    breaklines=true,
    frame=lines,
    backgroundcolor=\color{background},
    literate=
     *{0}{{{\color{numb}0}}}{1}
      {1}{{{\color{numb}1}}}{1}
      {2}{{{\color{numb}2}}}{1}
      {3}{{{\color{numb}3}}}{1}
      {4}{{{\color{numb}4}}}{1}
      {5}{{{\color{numb}5}}}{1}
      {6}{{{\color{numb}6}}}{1}
      {7}{{{\color{numb}7}}}{1}
      {8}{{{\color{numb}8}}}{1}
      {9}{{{\color{numb}9}}}{1}
      {:}{{{\color{punct}{:}}}}{1}
      {,}{{{\color{punct}{,}}}}{1}
      {\{}{{{\color{delim}{\{}}}}{1}
      {\}}{{{\color{delim}{\}}}}}{1}
      {[}{{{\color{delim}{[}}}}{1}
      {]}{{{\color{delim}{]}}}}{1},
}

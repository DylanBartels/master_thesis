# Trustless Logistics Contracts

University of Amsterdam - Software Engineering Master thesis
Repository contains all presentations, documentation and testsetup program.

The testsetup program can be found [here](/src), follow the [readme.md](/src/README.md) to recreate testsetup.<br>
The thesis pdf can be found [here](/thesis/main.pdf).

### Prerequisites

Pdflatex is required to compile latex documentation locally

```
brew cask install basictex
```

Needs the following pdflatex packages

```
tlmgr install sectsty
```

### Compile latex documents

```
./compile_latex.sh
```

### Planning

| Week           | Activity                                                    |
|----------------|-------------------------------------------------------------|
| 1. 9-15 April  | Orientate on stack - Multisigniture - IPFS - Openbazaar 2.0 |
| 2. 16-22 April | Work out actor balance, define hypothesis                   |
| 3. 23-29 April | Work out measurement parameters                             |
| 4. 30-6 May    | Develop testsetup                                           |
| 5. 7-13 May    | Develop testsetup                                           |
| 6. 14-20 May   | Start conducting experiments                                |
| 7. 21-27 May   | Second round of experiments                                 |
| 8. 28-3 June   | Analyse results                                             |
| 9. 4-10 June   | Write conclusion                                            |
| 10. 11-17 June | Discussion                                                  |
| 11. 18-24 June | Buffer                                                      |
| 12. 25-1 July  | Buffer                                                      |

## Author

Dylan Bartels - 10607072

## Supervisor

Jaap van Ginkel

## Acknowledgments

* CargoLedger
* UvA

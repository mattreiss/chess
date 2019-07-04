#!/bin/bash

function help() {
  echo "Generates redux files in ../src/redux"
  echo "redux.sh <name>"
}

if [[ $1 == "help" ]]; then
  help
  exit 0
fi

scriptsDir=$(dirname "$0")
currentDir=$(pwd)
scriptsDir="$(echo "${scriptsDir/./$currentDir}")"

cd $scriptsDir
cd ../src/data/redux

name=$1

function createActions() {
  cp actions/MainActions.js actions/${name}Actions.js
  sed -i "s/Main/${name}/g" actions/${name}Actions.js
}

function createSagas() {
  cp sagas/MainSagas.js sagas/${name}Sagas.js
  sed -i "s/Main/${name}/g" sagas/${name}Sagas.js
}

if [[ $name != "" ]]; then
  createActions
  createSagas
  $scriptsDir/index.sh "data/redux" -r
else
  echo "missing name arg"
  help
fi

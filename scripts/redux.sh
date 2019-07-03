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
cd ../src/redux

name=$1

function createActions() {
  echo "actions" > actions/${name}Actions.js
}

function createSagas() {
  echo "sagas" > sagas/${name}Sagas.js
}

if [[ $name != "" ]]; then
  createActions
  createSagas
else
  echo "missing name arg"
  help
fi

$scriptsDir/index.sh "redux" -r

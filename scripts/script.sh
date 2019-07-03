#!/bin/bash

function help() {
  echo "Runs a script"
  echo "script.sh <name>"
}

if [[ $1 == "help" ]]; then
  help
  exit 0
fi

scriptsDir=$(dirname "$0")
currentDir=$(pwd)
scriptsDir="$(echo "${scriptsDir/./$currentDir}")"

scriptFile=${scriptsDir}/${1}.sh
if [[ -f ${scriptFile} ]]; then
  ${scriptFile} $(echo "${@:2}")
else
  echo "${scriptFile} does not exist!"
  help
fi

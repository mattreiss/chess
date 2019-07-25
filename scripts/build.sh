#!/bin/bash

function help() {
  # echo "Creates apk and ipa builds"
  echo "build.sh"
}

if [[ $1 == "help" ]]; then
  help
  exit 0
fi

scriptsDir=$(dirname "$0")
currentDir=$(pwd)
scriptsDir="$(echo "${scriptsDir/./$currentDir}")"

function build() {
  echo "building apk"
  echo "building ipa"
}

build

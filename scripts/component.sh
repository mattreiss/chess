#!/bin/bash

function help() {
  # echo "Generates components in ../src/components"
  echo "component.sh <folderName> <fileName>"
}

if [[ $1 == "help" ]]; then
  help
  exit 0
fi

scriptsDir=$(dirname "$0")
currentDir=$(pwd)
scriptsDir="$(echo "${scriptsDir/./$currentDir}")"

cd $scriptsDir
cd ../src/components

folder=$1
name=$2

function createComponent() {
  mkdir -p $folder
  dest="${folder}/${name}.js"
  cp _samples/MainSample.js $dest
  sed -i "s/MainSample/${name}/g" $dest
}

function createStyles() {
  mkdir -p $folder/styles
  cp _samples/styles/MainSampleStyle.js ${folder}/styles/${name}Style.js
}

if [[ $folder != "" && $name != "" ]]; then
  createComponent
  createStyles
  $scriptsDir/index.sh "components/$folder" -r
else
  echo "missing folder and name args"
  help
fi

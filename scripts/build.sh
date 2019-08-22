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

releaseDate=`date +%Y-%m-%d`
releaseName="release-$releaseDate"

function deployJS() {
  npm i
  expo publish --release-channel production --non-interactive
}

function commitRelease() {
  git add .
  git commit -m "$releaseName"
  git push
  git checkout -b $releaseName
  git checkout $releaseName
  git add .
  git commit -m "$releaseName"
  git push --set-upstream origin $releaseName
  git checkout master
}

function buildAndroid() {
  echo "building apk"
  expo build:android --release-channel production --non-interactive --no-publish
  curl -o $releaseName.apk "$(expo url:apk --non-interactive)"
}

function buildIos() {
  echo "building ipa"
  expo build:ios --release-channel production --non-interactive --no-publish
  curl -o $releaseName.ipa "$(expo url:ipa --non-interactive)"
}


function build() {
  # deployJS
  # commitRelease
  buildAndroid
  # buildIos
}

build

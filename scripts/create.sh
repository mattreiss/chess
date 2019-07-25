#!/bin/bash
scriptsDir=$(dirname "$0")
currentDir=$(pwd)
scriptsDir="$(echo "${scriptsDir/./$currentDir}")"

if [[ $1 == "help" ]]; then
  echo "create.sh <newScriptName>"
  exit 0
fi


function createScript() {
  script=$1
  echo '#!/bin/bash
scriptsDir=$(dirname "$0")
currentDir=$(pwd)
scriptsDir="$(echo "${scriptsDir/./$currentDir}")"

if [[ $1 == "help" ]]; then
  echo "'${script}.sh'"
  exit 0
fi
  ' > ${scriptsDir}/${script}.sh
  chmod +x ${scriptsDir}/${script}.sh
  echo "Successfully created ${scriptsDir}/${script}.sh"
}

scriptName=$1
if [[ $scriptName == "" ]]; then
  echo "missing script name"
elif [[ -f $scriptsDir/${scriptName}.sh ]]; then
  echo "$scriptsDir/${scriptName}.sh already exists"
else
  createScript $scriptName
fi

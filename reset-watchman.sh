#!/bin/sh

# Resolve the current directory path
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Execute the watchman commands
watchman watch-del "$DIR"
watchman watch-project "$DIR"

# Check if the commands succeeded
if [ $? -ne 0 ]; then
    echo -e "${RED}An error occurred while executing the commands.${NC}"
    exit 1
fi

echo "\n${GREEN}Watchman commands executed successfully.${NC} 😊\n"


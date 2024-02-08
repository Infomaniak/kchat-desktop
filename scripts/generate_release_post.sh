#!/bin/bash
set -eu

VERSION="$1" # such as 5.3.0-rc.1, 5.0.0

cat <<-MD
#### $VERSION Published to GitHub Releases

https://github.com/Infomaniak/kchat-desktop/releases/tag/$VERSION
MD

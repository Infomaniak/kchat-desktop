#!/bin/bash
set -eu

VERSION="$1" # such as 5.3.0-rc.1, 5.0.0

TEMP_VERSION_FILE="$(mktemp -t temp_version_file.XXXX)"
git for-each-ref --sort=creatordate --format '%(refname)' refs/tags | grep "v[0-9]\.[0-9]\.[0-9]" | grep -v mas | grep -v "v$VERSION" | sed "s/refs\/tags\/v//" > $TEMP_VERSION_FILE
LAST_VERSION="$(cat $TEMP_VERSION_FILE | tail -1)"

TEMP_CHANGES_FILE="$(mktemp -t temp_changes_file.XXXX)"
git cherry -v v$LAST_VERSION v$VERSION | grep ^+ | grep "(#[0-9]\+)" > $TEMP_CHANGES_FILE

cat <<-MD
#### $VERSION Published to GitHub Releases

https://github.com/Infomaniak/kchat-desktop/releases/tag/$VERSION
MD

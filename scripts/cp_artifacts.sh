#!/usr/bin/env bash
set -eu

VERSION="$(jq -r '.version' <package.json)"
SRC="${1}"
DEST="${2}"
if [[ ! -d "${DEST}/${VERSION}" ]]; then
    echo "Can't find destination. Creating \"${DEST}/${VERSION}\""
    mkdir -p "${DEST}/${VERSION}"
fi

if [[ ! -d "${SRC}" ]]; then
    echo "Can't find source directory, exiting."
    exit 1
fi

rm -rf "${SRC}/*-unpacked"
cp -rv "${SRC}/" "${DEST}/"
# cp -v "${SRC}"/*.yml "${DEST}/"

exit 0

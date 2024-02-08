#!/usr/bin/env bash
set -eu

VERSION="$(jq -r '.version' <package.json)"
SRC="${1}"
DEST="${2}"
SOMETHING_COPIED=0
if [[ ! -d "${DEST}" ]]; then
    echo "Can't find destination. Creating \"${DEST}\""
    mkdir -p "${DEST}"
fi

if [[ -f "${SRC}/kchat-desktop-${VERSION}-win-ia32.zip" ]]; then
    echo -e "Copying Win32\n"
    cp "${SRC}/kchat-desktop-${VERSION}-win-ia32.zip" "${DEST}/kchat-desktop-${VERSION}-win32.zip"
    SOMETHING_COPIED=1
fi
if [[ -f "${SRC}/kchat-desktop-${VERSION}-win-x64.zip" ]]; then
    echo -e "Copying Win64\n"
    cp "${SRC}/kchat-desktop-${VERSION}-win-x64.zip" "${DEST}/kchat-desktop-${VERSION}-win64.zip"
    SOMETHING_COPIED=$((SOMETHING_COPIED + 1))
fi
if [[ -f "${SRC}/kchat-desktop-${VERSION}-win-arm64.zip" ]]; then
    echo -e "Copying Win64\n"
    cp "${SRC}/kchat-desktop-${VERSION}-win-arm64.zip" "${DEST}/kchat-desktop-${VERSION}-arm64.zip"
    SOMETHING_COPIED=$((SOMETHING_COPIED + 2))
fi
if [[ -f "${SRC}/kchat-desktop-setup-${VERSION}-win.exe" ]]; then
    echo -e "Copying win-no-arch\n"
    cp "${SRC}/kchat-desktop-setup-${VERSION}-win.exe" "${DEST}/kchat-desktop-setup-${VERSION}-win.exe"
    SOMETHING_COPIED=$((SOMETHING_COPIED + 3))
fi
if [[ -f "${SRC}/kchat-desktop-${VERSION}-x64.msi" ]]; then
    echo -e "Copying win-msi-x64\n"
    cp "${SRC}/kchat-desktop-${VERSION}-x64.msi" "${DEST}/kchat-desktop-${VERSION}-x64.msi"
    SOMETHING_COPIED=$((SOMETHING_COPIED + 4))
fi
if [[ -f "${SRC}/kchat-desktop-${VERSION}-x86.msi" ]]; then
    echo -e "Copying win-msi-x86\n"
    cp "${SRC}/kchat-desktop-${VERSION}-x86.msi" "${DEST}/kchat-desktop-${VERSION}-x86.msi"
    SOMETHING_COPIED=$((SOMETHING_COPIED + 5))
fi

# if [[ -f "${SRC}/kchat-desktop-${VERSION}-mac.zip" ]]; then
#     echo -e "Copying mac\n"
#     cp "${SRC}"/kchat-desktop-*-mac*.* "${DEST}/"
#     if [[ -f "${SRC}"/kchat-desktop-${VERSION}-mac.dmg ]]; then
#         cp "${SRC}"/*.blockmap "${DEST}/"
#     fi
#     SOMETHING_COPIED=$((SOMETHING_COPIED + 6))
# fi
# if [[ -f "${SRC}/kchat-desktop-${VERSION}-mac-x64.zip" ]]; then
#     echo -e "Copying mac-x64\n"
#     cp "${SRC}/kchat-desktop-${VERSION}-mac-x64.zip" "${DEST}/kchat-desktop-${VERSION}-mac-x64.zip"
#     if [[ -f "${SRC}"/kchat-desktop-${VERSION}-mac-x64.dmg ]]; then
#         cp "${SRC}/kchat-desktop-${VERSION}-mac-x64.dmg.blockmap" "${DEST}/kchat-desktop-${VERSION}-mac-x64.dmg.blockmap"
#         cp "${SRC}/kchat-desktop-${VERSION}-mac-x64.dmg" "${DEST}/kchat-desktop-${VERSION}-mac-x64.dmg"
#     fi
#     SOMETHING_COPIED=$((SOMETHING_COPIED + 7))
# fi
# if [[ -f "${SRC}/kchat-desktop-${VERSION}-mac-arm64.zip" ]]; then
#     echo -e "Copying mac-arm64\n"
#     cp "${SRC}/kchat-desktop-${VERSION}-mac-arm64.zip" "${DEST}/kchat-desktop-${VERSION}-mac-arm64.zip"
#     if [[ -f "${SRC}"/kchat-desktop-${VERSION}-mac-arm64.dmg ]]; then
#         cp "${SRC}/kchat-desktop-${VERSION}-mac-arm64.dmg.blockmap" "${DEST}/kchat-desktop-${VERSION}-mac-arm64.dmg.blockmap"
#         cp "${SRC}/kchat-desktop-${VERSION}-mac-arm64.dmg" "${DEST}/kchat-desktop-${VERSION}-mac-arm64.dmg"
#     fi
#     SOMETHING_COPIED=$((SOMETHING_COPIED + 8))
# fi
# if [[ -f "${SRC}/kchat-desktop-${VERSION}-mac-universal.zip" ]]; then
#     echo -e "Copying mac-universal\n"
#     cp "${SRC}/kchat-desktop-${VERSION}-mac-universal.zip" "${DEST}/kchat-desktop-${VERSION}-mac-universal.zip"
#     if [[ -f "${SRC}"/kchat-desktop-${VERSION}-mac-universal.dmg ]]; then
#         cp "${SRC}/kchat-desktop-${VERSION}-mac-universal.dmg.blockmap" "${DEST}/kchat-desktop-${VERSION}-mac-universal.dmg.blockmap"
#         cp "${SRC}/kchat-desktop-${VERSION}-mac-universal.dmg" "${DEST}/kchat-desktop-${VERSION}-mac-universal.dmg"
#     fi
#     SOMETHING_COPIED=$((SOMETHING_COPIED + 9))
# fi

# if [[ -f "${SRC}"/kchat-desktop-${VERSION}-linux-x64.tar.gz ]]; then
#     echo -e "Copying linux\n"
#     cp "${SRC}"/kchat-desktop-*-linux-x64* "${DEST}/"
#     cp "${SRC}"/kchat-desktop-*-linux-x86_64* "${DEST}/"
#     cp "${SRC}"/kchat-desktop_"${VERSION}"-1_amd64*.deb "${DEST}/"
#     SOMETHING_COPIED=$((SOMETHING_COPIED + 10))
# fi

# if [[ -f "${SRC}"/kchat-desktop-${VERSION}-linux-arm64.tar.gz ]]; then
#     echo -e "Copying linux\n"
#     cp "${SRC}"/kchat-desktop-*-linux-arm64* "${DEST}/"
#     cp "${SRC}"/kchat-desktop-*-linux-aarch64* "${DEST}/"
#     cp "${SRC}"/kchat-desktop_"${VERSION}"-1_arm64*.deb "${DEST}/"
#     SOMETHING_COPIED=$((SOMETHING_COPIED + 11))
# fi

if [[ $SOMETHING_COPIED -eq 0 ]]; then
    echo "Didn't find anything to copy, it seems like something failed"
    # Bash only returns 0-255 values
    exit 1
fi

# cp "${1}"/*.yml "${2}/"

# exit $SOMETHING_COPIED
exit 0


#!/bin/sh
set -e
WORKING_DIR=`pwd`
THIS_PATH=`readlink -f $0`
cd `dirname ${THIS_PATH}`
FULL_PATH=`pwd`
cd ${WORKING_DIR}
cat <<EOS > com.infomaniak.chat
[Desktop Entry]
Name=kChat
Comment=kChat Desktop application for Linux
Exec="${FULL_PATH}/kchat-desktop"
Terminal=false
Type=Application
Icon=${FULL_PATH}/app_icon.png
Categories=Network;InstantMessaging;
EOS
chmod +x com.infomaniak.chat

execSync('xdg-settings set default-url-scheme-handler  com.infomaniak.chat')

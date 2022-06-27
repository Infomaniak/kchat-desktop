#!/bin/sh
set -e
WORKING_DIR=`pwd`
THIS_PATH=`readlink -f $0`
cd `dirname ${THIS_PATH}`
FULL_PATH=`pwd`
cd ${WORKING_DIR}
cat <<EOS > kChat.desktop
[Desktop Entry]
Name=kChat
Comment=kChat Desktop application for Linux
Exec="${FULL_PATH}/kchat-desktop"
Terminal=false
Type=Application
Icon=${FULL_PATH}/app_icon.png
Categories=Network;InstantMessaging;
EOS
chmod +x kChat.desktop

execSync ( 'xdg-settings set default-url-scheme-handler ktalk kchat.desktop' )

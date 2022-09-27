# https://download.storage5.infomaniak.com/kchat/kchat-desktop-1.1.1-mac-x64.dmg

#!/bin/bash

# latest=$(git describe --abbrev=0 --tags `git rev-list --tags --skip=1  --max-count=1`)

GITLAB_PROJECT_ACCESS_TOKEN=$1
GITLAB_PROJECT_TAG=$2
MILESTONE=$3
SLACK_API_TOKEN=$4
SLACK_NOTIFY_CHANNEL=$5

postchangelog=$(curl --write-out '%{http_code}' --request POST --header "PRIVATE-TOKEN: ${GITLAB_PROJECT_ACCESS_TOKEN}" --data "version=${GITLAB_PROJECT_TAG}" "https://gitlab.infomaniak.ch/api/v4/projects/3236/repository/changelog")
changelog=$(curl --request GET --header "PRIVATE-TOKEN: ${GITLAB_PROJECT_ACCESS_TOKEN}" --data "version=${GITLAB_PROJECT_TAG}" "https://gitlab.infomaniak.ch/api/v4/projects/3236/repository/changelog" | jq -r '.notes')
release=$(curl --write-out '%{http_code}' --request POST --header "PRIVATE-TOKEN: ${GITLAB_PROJECT_ACCESS_TOKEN}" --data "name=${GITLAB_PROJECT_TAG}&tag_name=${GITLAB_PROJECT_TAG}&description=${changelog}&milestones=${MILESTONE}" "https://gitlab.infomaniak.ch/api/v4/projects/3236/releases")
release=$(curl --write-out '%{http_code}' --request POST --header "PRIVATE-TOKEN: ${GITLAB_PROJECT_ACCESS_TOKEN}" --data "name=Mac-x64.dmg&url=https://download.storage5.infomaniak.com/kchat/kchat-desktop-${GITLAB_PROJECT_TAG}-mac-x64.dmg" "https://gitlab.infomaniak.ch/api/v4/projects/3236/releases/${GITLAB_PROJECT_TAG}/assets/links")
release=$(curl --write-out '%{http_code}' --request POST --header "PRIVATE-TOKEN: ${GITLAB_PROJECT_ACCESS_TOKEN}" --data "name=Linux-x86_64.AppImage&url=https://download.storage5.infomaniak.com/kchat/kchat-desktop-${GITLAB_PROJECT_TAG}-linux-x86_64.AppImage" "https://gitlab.infomaniak.ch/api/v4/projects/3236/releases/${GITLAB_PROJECT_TAG}/assets/links")
release=$(curl --write-out '%{http_code}' --request POST --header "PRIVATE-TOKEN: ${GITLAB_PROJECT_ACCESS_TOKEN}" --data "name=Windows-x86_64.exe&url=https://download.storage5.infomaniak.com/kchat/kchat-desktop-setup-${GITLAB_PROJECT_TAG}-win.exe" "https://gitlab.infomaniak.ch/api/v4/projects/3236/releases/${GITLAB_PROJECT_TAG}/assets/links")

commit_url="https://gitlab.infomaniak.ch/kchat/desktop/-/commit/"
mr_url="https://gitlab.infomaniak.ch/kchat/desktop/-/merge_requests/"

format1=${changelog//kchat\/desktop@/${commit_url}}
format2=${format1//kchat\/desktop!/${mr_url}}

links=$(cat << EOF
Installers: | <https://download.storage5.infomaniak.com/kchat/kchat-desktop-${GITLAB_PROJECT_TAG}-mac-x64.dmg|Mac> | <https://download.storage5.infomaniak.com/kchat/kchat-desktop-${GITLAB_PROJECT_TAG}-linux-x86_64.AppImage|Linux AppImage> | <https://download.storage5.infomaniak.com/kchat/kchat-desktop-setup-${GITLAB_PROJECT_TAG}-win.exe|Windows>
EOF
)

slack=$(curl https://slack.com/api/files.upload -F token="${SLACK_API_TOKEN}" -F initial_comment="${links}" -F channels="${SLACK_NOTIFY_CHANNEL}" -F title="Desktop Release ${GITLAB_PROJECT_TAG}" -F filetype="post" -F content="${format2}")

echo slack

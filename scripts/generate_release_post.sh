#!/bin/bash
set -eu

VERSION="${VERSION:-}"
RUN_URL="${RUN_URL:-}"
BUILD_LINUX_RESULT="${BUILD_LINUX_RESULT:-}"
BUILD_LINUX_ARM_RESULT="${BUILD_LINUX_ARM_RESULT:-}"
BUILD_WINDOWS_RESULT="${BUILD_WINDOWS_RESULT:-}"
GITHUB_RELEASE_RESULT="${GITHUB_RELEASE_RESULT:-}"

failed_jobs=()

if [ "$BUILD_LINUX_RESULT" != "success" ] && [ -n "$BUILD_LINUX_RESULT" ]; then
    failed_jobs+=("build-linux: \`$BUILD_LINUX_RESULT\`")
fi
if [ "$BUILD_LINUX_ARM_RESULT" != "success" ] && [ -n "$BUILD_LINUX_ARM_RESULT" ]; then
    failed_jobs+=("build-linux-arm: \`$BUILD_LINUX_ARM_RESULT\`")
fi
if [ "$BUILD_WINDOWS_RESULT" != "success" ] && [ -n "$BUILD_WINDOWS_RESULT" ]; then
    failed_jobs+=("build-windows: \`$BUILD_WINDOWS_RESULT\`")
fi
if [ "$GITHUB_RELEASE_RESULT" != "success" ] && [ -n "$GITHUB_RELEASE_RESULT" ]; then
    failed_jobs+=("github-release: \`$GITHUB_RELEASE_RESULT\`")
fi

if [ ${#failed_jobs[@]} -eq 0 ]; then
    echo "✅ **Release $VERSION deployed successfully**"
else
    echo "❌ **Release $VERSION failed**"
    echo ""
    echo "Failed jobs :"
    for job in "${failed_jobs[@]}"; do
        echo "- $job"
    done
fi

echo ""
echo "🔗 [Pipeline details]($RUN_URL)"

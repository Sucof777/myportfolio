#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "error: scripts/push.sh must be run inside a Git repository" >&2
  exit 1
fi

REMOTE_NAME=${REMOTE_NAME:-origin}
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
TARGET_BRANCH=${1:-$CURRENT_BRANCH}

if [[ -z "${TARGET_BRANCH}" || "${TARGET_BRANCH}" == "HEAD" ]]; then
  echo "error: unable to determine the current branch. Pass the branch name explicitly as an argument." >&2
  exit 1
fi

if git remote get-url "$REMOTE_NAME" >/dev/null 2>&1; then
  REMOTE_URL=$(git remote get-url "$REMOTE_NAME")
else
  REMOTE_URL=${GIT_REMOTE_URL:-}
  if [[ -z "$REMOTE_URL" ]]; then
    cat <<'USAGE' >&2
error: remote "origin" is not configured.

Set the GIT_REMOTE_URL environment variable to your GitHub repository URL and rerun the script, e.g.:

  GIT_REMOTE_URL=git@github.com:username/myportfolio.git bash scripts/push.sh

Alternatively, configure the remote manually:

  git remote add origin git@github.com:username/myportfolio.git
USAGE
    exit 1
  fi
  git remote add "$REMOTE_NAME" "$REMOTE_URL"
fi

echo "Pushing branch '$TARGET_BRANCH' to '$REMOTE_NAME' (${REMOTE_URL})..."
git push -u "$REMOTE_NAME" "$TARGET_BRANCH"

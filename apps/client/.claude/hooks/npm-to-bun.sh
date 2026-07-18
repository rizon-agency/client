#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then exit 0; fi

TRANSFORMED="$COMMAND"
TRANSFORMED=$(echo "$TRANSFORMED" | sed 's/^npm /bun /; s/ npm / bun /')
TRANSFORMED=$(echo "$TRANSFORMED" | sed 's/^npx /bunx /; s/ npx / bunx /')
TRANSFORMED=$(echo "$TRANSFORMED" | sed 's/^yarn /bun /; s/ yarn / bun /')
TRANSFORMED=$(echo "$TRANSFORMED" | sed 's/^pnpm /bun /; s/ pnpm / bun /')

if [ "$COMMAND" != "$TRANSFORMED" ]; then
  jq -n --arg cmd "$TRANSFORMED" '{
    "hookSpecificOutput": {
      "hookEventName": "PreToolUse",
      "permissionDecision": "allow",
      "transformedToolInput": { "command": $cmd }
    }
  }'
else
  exit 0
fi

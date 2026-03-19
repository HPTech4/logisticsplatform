# Git Ignore Notes

This backend project now ignores files that should not be committed to Git.

## What is ignored and why

- `node_modules/`
  - Installed packages can be recreated with `npm install`.
  - Keeping it out of Git avoids huge repository size.

- `.env` and `.env.*` (except `.env.example`)
  - Environment files often contain secrets (JWT secret, API keys, database keys).
  - `.env.example` stays tracked as a safe template for setup.

- `logs/` and `*.log`
  - Log files are runtime outputs and not source code.

- `*.pid`, `*.seed`, `*.pid.lock`, `.cache/`, `tmp/`, `temp/`
  - Runtime/process/temp artifacts that change frequently.

- `coverage/`, `.nyc_output/`
  - Test coverage outputs are generated files.

- `dist/`, `build/`
  - Build artifacts can be regenerated from source.

- `.idea/`, `.vscode/`, `.DS_Store`, `Thumbs.db`
  - Editor and OS local files not required for the app.

## Important note

If a file was already committed before being added to `.gitignore`, Git will still track it.

To stop tracking a file while keeping it locally:

- `git rm --cached <path>`

Example:

- `git rm --cached .env`
- `git rm -r --cached node_modules`

Then commit the changes.

## Quick checks

- Review tracked changes: `git status`
- See ignored files: `git status --ignored`

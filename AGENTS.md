# ORES Chat public live-E2E instructions

- Test only the public production site and the isolated `ores-chat-test` marketing fixture declared in the Playwright configuration.
- Production must remain honest when no API origin is configured; never treat an unavailable state as a successful model response.
- Interactive success-path tests run only against the deterministic test-org service-worker endpoint and must assert its test labeling and context separation.
- Never enter credentials, personal data, private context, customer identifiers, or provider secrets into a live test.
- Capture failures through assertions and GitHub Actions artifacts; do not weaken HTTPS, integrity, accessibility, or audience-boundary checks.
- Do not add React, React DOM, JSX, TSX, Next.js, or a React-compatible test fixture.
- Use feature branches and pull requests. Never rebase, force-push, stash, or reset shared work.

## Repository-local Git worktrees

- Create or use a Git worktree only when the human operator explicitly authorizes it for the current task. Concurrency or a dirty checkout is not permission by itself.
- Put every authorized worktree at `<repository-root>/tmp/worktrees/<name>`; from the repository root, use `./tmp/worktrees/<name>`. Never place worktrees beside repositories or organization directories.
- Keep `tmp`, `temp`, `tmp/worktrees`, and `temp/worktrees` ignored in the repository-root `.gitignore`. Do not commit files from those directories.
- Relocate or remove a worktree only when the operator explicitly requests it. Before removal, preserve and publish intended changes, verify its commit is represented on the target branch, and confirm there are no tracked, untracked, ignored-sensitive, or in-use files that must survive. Remove it with `git worktree remove <path>` without `--force`; never delete a worktree directory with `rm`.

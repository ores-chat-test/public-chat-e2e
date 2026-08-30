# ORES Chat public live-E2E instructions

- Test only the public production site and the isolated `ores-chat-test` marketing fixture declared in the Playwright configuration.
- Production must remain honest when no API origin is configured; never treat an unavailable state as a successful model response.
- Interactive success-path tests run only against the deterministic test-org service-worker endpoint and must assert its test labeling and context separation.
- Never enter credentials, personal data, private context, customer identifiers, or provider secrets into a live test.
- Capture failures through assertions and GitHub Actions artifacts; do not weaken HTTPS, integrity, accessibility, or audience-boundary checks.
- Do not add React, React DOM, JSX, TSX, Next.js, or a React-compatible test fixture.
- Use feature branches and pull requests. Never rebase, force-push, stash, or reset shared work.

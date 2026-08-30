# ORES Chat public live E2E

Browser acceptance coverage for the production ORES Chat marketing site and the isolated live consumer fixture in `ores-chat-test`.

The suite verifies:

- the production homepage and footer bot entry point;
- navigation into the public chat page;
- the honest production-unavailable state while no HTTPS API origin is configured;
- desktop and mobile layouts;
- loading the production custom-element bundle inside the test organization;
- successful dialog interaction against a deterministic same-origin test double;
- independent `main-marketing` and `partner-marketing` context identifiers.

The scheduled and manually dispatched GitHub Actions workflow runs Chromium against:

```text
https://ores-chat.github.io/
https://ores-chat-test.github.io/marketing-sites-consumer-e2e/
```

Run `npm ci`, `npx playwright install chromium`, and `npm test` for the same checks locally. No credentials or real user data are required or permitted.

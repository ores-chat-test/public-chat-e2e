import { expect, test } from "@playwright/test";

const productionSite = process.env.ORES_CHAT_PRODUCTION_SITE ?? "https://ores-chat.github.io/";
const testSite = process.env.ORES_CHAT_TEST_SITE
  ?? "https://ores-chat-test.github.io/marketing-sites-consumer-e2e/";

for (const url of [productionSite, testSite]) {
  if (new URL(url).protocol !== "https:") throw new Error(`live E2E target must use HTTPS: ${url}`);
}

test("production marketing site publishes the bot entry point and honest API state", async ({ page }) => {
  await page.goto(productionSite, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: /Useful chat/ })).toBeVisible();
  await expect(page.locator("ores-chat-footer-link")).toHaveCount(1);

  const footerEntry = page.getByRole("link", { name: "Chat with ORES" });
  await expect(footerEntry).toHaveAttribute("href", /\/chat\/\?context=ores-chat-marketing/);
  await footerEntry.click();

  await expect(page).toHaveURL(/\/chat\/\?context=ores-chat-marketing/);
  await expect(page.getByRole("heading", { level: 1, name: "Ask the site." })).toBeVisible();
  await expect(page.getByText("Public chat is not connected yet.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Start a conversation" })).toHaveCount(0);
});

test("test-org fixture exercises independent live bot contexts", async ({ page }) => {
  await page.goto(testSite, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: /One production component/ })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-fixture-ready", "true");
  await expect(page.getByRole("status")).toHaveText("Isolated chat endpoint ready");
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));

  await exerciseBot({
    page,
    elementId: "main-marketing-bot",
    openLabel: "Open main-site bot",
    contextId: "main-marketing",
    message: "What does the main marketing site offer?",
  });
  await exerciseBot({
    page,
    elementId: "partner-marketing-bot",
    openLabel: "Open partner-site bot",
    contextId: "partner-marketing",
    message: "What does the partner marketing site offer?",
  });
});

async function exerciseBot({ page, elementId, openLabel, contextId, message }) {
  const component = page.locator(`#${elementId}`);
  await component.getByRole("link", { name: openLabel }).click();
  await expect(component.getByRole("dialog", { name: "Ask this site" })).toBeVisible();
  await component.getByLabel("Message").fill(message);
  await component.getByRole("button", { name: "Send" }).click();
  await expect(component.getByText(`Deterministic test reply for ${contextId}:`)).toBeVisible();
  await expect(component.getByText(message, { exact: true })).toHaveCount(2);
  await expect(page.locator("html")).toHaveAttribute("data-last-result", `${elementId}:response`);
  await component.getByRole("button", { name: "Close chat" }).click();
}

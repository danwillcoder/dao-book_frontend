const { test, expect } = require("@playwright/test");

/**
 *
 * @param {string} originalToken A complete JWT token
 * @param {number} newExpiration
 * @returns JWT with updated timestamp
 */
function updateJwtExpiration(originalToken, newExpiration) {
  const [headerBase64, payloadBase64, signatureBase64] =
    originalToken.split(".");

  const payload = JSON.parse(atob(payloadBase64));
  payload.exp = newExpiration;
  const updatedPayloadBase64 = btoa(JSON.stringify(payload));

  const updatedToken = `${headerBase64}.${updatedPayloadBase64}.${signatureBase64}`;

  return updatedToken;
}

module.exports = {
  updateJwtExpiration,
};

test.describe("Register", () => {
  const fakePracId = "64c795c2b4524e92922cdc9b";

  test.beforeEach(async ({ page }) => {
    await page.goto("register");
    await page.route("**/*/prac", async (route) => {
      const json = {
        message: "Prac created successfully!",
        prac: {
          firstName: "TestName",
          lastName: "TestLast",
          email: "testEmail@example.com",
          password:
            "$2a$10$ApcuKTdzYGpyiXe3BCcy5uvlIUtAzGGzXjyO3u4nfGWAt8wzOVdUu",
          _id: fakePracId,
          __v: 0,
        },
      };
      await route.fulfill(json);
    });
  });

  test("should allow me to load the page", async ({ page }) => {
    await expect(page).toHaveTitle(/Dao Book/);
  });

  test("should allow me to register with valid fields", async ({ page }) => {
    await page.getByPlaceholder("Susan", { exact: true }).fill("TestName");
    await page.getByPlaceholder("Reynolds").fill("TestLast");
    await page
      .getByPlaceholder("susan@example.com")
      .fill("testEmail@example.com");
    await page.getByPlaceholder("1336").fill("1234");
    await page.getByPlaceholder("*****").fill("daobook");
    await page.getByRole("button", { name: "Register" }).click();
    await page.waitForURL("**/login");
    expect(await page.getByRole("heading").count()).toBe(1);
  });

  test("should not allow me to register with missing required fields", async ({
    page,
  }) => {
    await page.getByPlaceholder("Susan", { exact: true }).fill("TestName");
    await page.getByPlaceholder("Reynolds").fill("TestLast");
    await page
      .getByPlaceholder("susan@example.com")
      .fill("testEmail@example.com");
    await page.getByPlaceholder("*****").fill("daobook");
    await page.getByRole("button", { name: "Register" }).click();
    const invalidLocator = page.locator("input#AHPRA[required]:invalid");
    const invalidPseudoclass = await invalidLocator.evaluate((el) =>
      el.matches(":invalid")
    );
    expect(invalidPseudoclass).toBeTruthy();
  });
});

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("login");

    const originalToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM3MGJhNzBjNmY0MDMxOTliYWMyZWMiLCJpYXQiOjE2OTExMTAxMjEsImV4cCI6MTY5MTExMzcyMX0.fVH8aN5RF27WqBzOv_lMuq7vQxgvfIRZIMUGfYHmzOg";
    const newExpiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // New expiration time (e.g., 24 hours from now)
    const updatedToken = updateJwtExpiration(originalToken, newExpiration);

    await page.route("**/*/prac/login", async (route) => {
      // This login token expires every hour.
      const loginJson = {
        token: updatedToken,
      };
      await route.fulfill({ body: JSON.stringify(loginJson) });
    });

    const fakePracId = "64c795c2b4524e92922cdc9b";

    await page.route(`**/*/prac/${fakePracId}`, async (route) => {
      const pracJson = {
        message: "Prac fetched.",
        prac: {
          _id: fakePracId,
          firstName: "TestName",
          lastName: "TestLast",
          email: "test@test.com",
          password:
            "$2a$10$ApcuKTdzYGpyiXe3BCcy5uvlIUtAzGGzXjyO3u4nfGWAt8wzOVdUu",
          __v: 0,
        },
      };
      await route.fulfill({ body: JSON.stringify(pracJson) });
    });
  });

  test("should allow me to load the page", async ({ page }) => {
    await expect(page).toHaveTitle(/Dao Book/);
  });

  test("should allow me to login with valid fields", async ({ page }) => {
    await page
      .getByPlaceholder("susan@example.com")
      .fill("testEmail@example.com");
    await page.getByPlaceholder("*****").fill("daobook");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      await page.getByRole("heading", { name: "Welcome to your clinic" })
    ).toBeVisible();
  });

  test("should not allow me to login with missing fields", async ({ page }) => {
    await page
      .getByPlaceholder("susan@example.com")
      .fill("testEmail@example.com");
    await page.getByRole("button", { name: "Login" }).click();
    const invalidLocator = page.locator("input#password[required]:invalid");
    const invalidPseudoclass = await invalidLocator.evaluate((el) =>
      el.matches(":invalid")
    );
    expect(invalidPseudoclass).toBeTruthy();
  });
});

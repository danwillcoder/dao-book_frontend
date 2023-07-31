const { test, expect } = require("@playwright/test");

test.describe("Register", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("register");
    await page.route("**/*/prac", async (route) => {
      const json = {
        message: "Prac created successfully!",
        prac: {
          firstName: "TestName",
          lastName: "TestLast",
          email: "test@test.com",
          password:
            "$2a$10$ApcuKTdzYGpyiXe3BCcy5uvlIUtAzGGzXjyO3u4nfGWAt8wzOVdUu",
          _id: "64c795c2b4524e92922cdc9b",
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
    await page.route("**/*/prac/login", async (route) => {
      const loginJson = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM3OTVjMmI0NTI0ZTkyOTIyY2RjOWIiLCJpYXQiOjE2OTA4MDE2NTksImV4cCI6MTY5MDgwNTI1OX0.8Tu3H2eNcx4ez3Mc1UKd2kMz4IZNgcloDA4BFIBuKzQ",
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
    await page.waitForURL("/");
    expect(await page.getByRole("heading").count()).toBe(1);
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

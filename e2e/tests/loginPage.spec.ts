import { expect, test } from "@playwright/test";
import LoginPage from "../pages/loginPage";

// Use describe when defining a group of tests that have
// similar functionality. For example, if the page does
// multiple things (i.e. links to other places, a form, etc)
// then you could group those using describe.
test.describe("Login Scenarios", () => {
  test("valid credentials", async ({ page }) => {
    // Create the page object
    const loginPage = new LoginPage(page);

    // Instead of using page.goto("www.google.com"),
    // we've extracted this into the LoginPage class.
    await loginPage.goto();

    // Perform the steps of the test
    await loginPage.usernameField.fill("student");
    await loginPage.passwordField.fill("Password123");
    await loginPage.submitButton.click();

    // Assert what you are expecting to happen
    await expect(loginPage.loginSuccessHeader).toBeInViewport();
    await expect(loginPage.loginSuccessMessage).toBeInViewport();
    await expect(loginPage.logoutButton).toBeInViewport();
    await expect(loginPage.logoutButton).toBeEnabled();

    // Another way to assert the above...
    await Promise.all([
      expect(loginPage.loginSuccessHeader).toBeInViewport(),
      expect(loginPage.loginSuccessMessage).toBeInViewport(),
      expect(loginPage.logoutButton).toBeInViewport(),
      expect(loginPage.logoutButton).toBeEnabled(),
    ]);
  });

  test("invalid username", async ({ page }) => {
    // Define the page object as before...
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Set any variables that are unique to this test
    const errorMessage = "Your username is invalid!";
    const invalidUsernames = ["studnet", "oops", "specialº˚¬∆∂ƒ"];

    // Perform multiple of the same test via a for loop
    for (const username of invalidUsernames) {
      // First pass will use `studnet`, next will use `oops`, etc...
      await loginPage.usernameField.fill(username);
      await loginPage.passwordField.fill("test");
      await loginPage.submitButton.click();

      // Verify that the login error appears
      await expect(loginPage.loginError).toHaveText(errorMessage);

      // Since the error message doesn't disappear on the next attempt,
      // let's refresh the page so the form error is cleared.
      await loginPage.page.reload();
    }
  });

  test("invalid password", async ({ page }) => {
    // Define the page object as before...
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const errorMessage = "Your password is invalid!";
    const invalidPasswords = ["pass", "specialº∂ƒ", "123123123"];

    for (const password of invalidPasswords) {
      await loginPage.usernameField.fill("student");
      await loginPage.passwordField.fill(password);
      await loginPage.submitButton.click();

      await expect(loginPage.loginError).toHaveText(errorMessage);

      await loginPage.page.reload();
    }
  });
});
